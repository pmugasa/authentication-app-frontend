import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../services/firebase";

function Edit({ user, profile }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  //handling errors
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  //back button
  const goBack = () => {
    navigate(-1);
  };

  //update user details
  async function handleSubmit(e) {
    e.preventDefault();
    //user document
    const docRef = doc(db, "users", user.uid);

    //updating user name or photo
    if (name) {
      updateDoc(docRef, {
        name,
      })
        .then(() => {
          setName("");
        })
        .catch((err) => console.error("something happened:", err));
    }

    //updating avatar
    if (photoUrl) {
      updateDoc(docRef, {
        photoUrl,
      })
        .then(() => {
          setPhotoUrl("");
        })
        .catch((err) => console.error("something happened:", err));
    }
    //updating phone
    if (phone) {
      updateDoc(docRef, {
        phone,
      })
        .then(() => {
          setPhone("");
        })
        .catch((err) => console.error("something happened:", err));
    }

    //updating bio
    if (bio) {
      updateDoc(docRef, {
        bio,
      })
        .then(() => {
          setBio("");
        })
        .catch((err) => console.error("something happened:", err));
    }

    //updating user email
    if (email) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          setEmail("");
        })
        .catch((err) => console.error("Opps something wrong!", err));
    }

    //updating password
    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          setPassword("");
        })
        .catch((err) => console.error("could not update password:", err));
    }
    alert("Successfully updated profile ✅");
    navigate(-1);
  }

  return (
    <>
      <div className="">
        <div
          onClick={goBack}
          className="flex items-center px-2 hover:cursor-pointer"
        >
          <img src="/chevron_left.svg" className="h-6 w-6" />
          <span className="text-dark-blue hover:underline text-sm font-medium">
            Back
          </span>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <div className="border border-[#E0E0E0] p-2 h-auto   w-[680px] rounded-lg">
            <div className="flex items-center justify-start px-2 mt-2 ">
              <div>
                <h3 className="font-semibold text-black text-md">
                  Change Info
                </h3>
                <p className="font-normal text-[#828282] text-xs">
                  Changes will be reflected to every service
                </p>
              </div>
            </div>
            {error && (
              <p className="text-red-500 font-medium text-sm text-center">
                {error}
              </p>
            )}
            <form className="px-2 mt-4" onSubmit={handleSubmit}>
              <div className="">
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.photoUrl}
                    className="h-14 w-14 rounded-md relative hover:cursor-pointer bg-[rgba(0,0,0,0.4)]"
                  />
                  <img
                    src="/photo_camera.svg"
                    className="h-7 w-7 absolute hover:cursor-pointer"
                    onClick={() => setShowInput(!showInput)}
                  />

                  <span
                    className=" blocktext-sm font-medium cursor-pointer text-[#BDBDBD]"
                    onClick={() => setShowInput(!showInput)}
                  >
                    CHANGE PHOTO
                  </span>
                </div>
                {showInput && (
                  <input
                    type="text"
                    placeholder="Paste your image url..."
                    className="block mt-4 h-10 w-[344px] px-4 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD]"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                )}
              </div>
              <div className="my-2">
                <label htmlFor="name" className="text-xs">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="block h-10 w-[344px] px-4 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD]"
                />
              </div>
              <div className="my-2">
                <label htmlFor="bio" className="text-xs">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter your bio..."
                  className="block text-xs text-[#BDBDBD] resize-none box-border h-16 w-[344px] px-4 py-2 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD]"
                ></textarea>
              </div>
              <div className="my-2">
                <label htmlFor="phone" className="text-xs">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone..."
                  className="block h-10 w-[344px] px-4 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD] "
                />
              </div>
              <div className="my-2">
                <label htmlFor="email" className="text-xs">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="block h-10 w-[344px] px-4 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD] "
                />
              </div>
              <div className="my-2">
                <label htmlFor="password" className="text-xs">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password..."
                  className="block h-10 w-[344px] px-4 outline outline-none border border-[#828282] rounded-md focus:outline focus:outline-dark-blue focus:border-none placeholder:text-xs placeholder:text-[#BDBDBD] "
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-md my-2 hover:bg-light-blue bg-dark-blue text-sm text-white font-medium"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
