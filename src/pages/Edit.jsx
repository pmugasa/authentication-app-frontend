import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Edit({ session, avatar_url }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //back button
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setUser(session.user);
  }, [session]);

  //update user details
  async function handleSubmit(e) {
    e.preventDefault();

    if (photoUrl) {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: photoUrl })
        .eq("id", user.id)
        .select();
      if (error) {
        console.log(error);
        return;
      }
    }
    if (name) {
      //update user name
      const { error } = await supabase
        .from("profiles")
        .update({ name: name })
        .eq("id", user.id)
        .select();
      if (error) {
        console.log(error);
        return;
      }
    }
    if (bio) {
      //update userbiio
      const { data, error } = await supabase
        .from("profiles")
        .update({ bio: bio })
        .eq("id", user.id)
        .select();
      if (error) {
        console.log(error);
        return;
      }

      console.log(data, "from updating phone");
    }
    if (phone) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ phone: phone })
        .eq("id", user.id)
        .select();
      if (error) {
        console.log(error);
        return;
      }

      console.log(data, "from updating phone");
    }
    if (email) {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
      if (error) {
        console.log(error);
        return;
      }
      console.log(data);
    }
    if (password) {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        console.log(error);
        return;
      }
      console.log(data, "from updating password");
    }
    goBack();
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

            <form className="px-2 mt-4" onSubmit={handleSubmit}>
              <div className="">
                <div className="flex items-center space-x-4">
                  <img
                    src={avatar_url}
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
