import Login from "./Login";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase.config";
import { useEffect, useState } from "react";

function Profile({ currentUser }) {
  const [bio, setBio] = useState("");

  if (!currentUser) {
    return <Login />;
  }

  const id = auth.currentUser.uid;
  const docRef = doc(db, "users", id);
  async function getBio() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBio(docSnap.data());
    }
  }
  getBio();

  return (
    <>
      <div className="">
        <div className="text-center p-2">
          <h1 className="font-semibold text-black text-lg">Personal Info</h1>
          <p className="font-light text-sm text-black">
            Basic info, like your name and photo
          </p>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <div className="border border-[#E0E0E0] p-2 h-[450px] sm:h-[450px]   md:h-[420] w-[680px] rounded-lg">
            <div className="flex items-center justify-start px-2 mt-2 ">
              <div>
                <h3 className="font-semibold text-black text-md">Profile</h3>
                <p className="font-normal text-[#828282] text-xs">
                  Some info may be visible to other people
                </p>
              </div>
              <Link
                to="/edit"
                className="ml-auto px-8 py-2 text-xs border hover:border-2 border-[#828282] rounded-lg"
              >
                Edit
              </Link>
            </div>
            <table className="mt-6 table-auto w-full">
              <tbody>
                <tr className="border-b border-t border-[#E0E0E0] ">
                  <td className="text-[#BDBDBD] text-sm px-2 py-4 ">PHOTO</td>
                  <td className="py-4 px-2">
                    <img
                      src={currentUser.photoURL}
                      className="w-10 h-10 rounded-md "
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#E0E0E0] ">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">NAME</td>
                  <td className="py-4 px-2 text-sm">
                    {currentUser.displayName}
                  </td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">BIO</td>
                  <td className="py-4 px-2 text-sm">{bio.bio}</td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">PHONE</td>
                  <td className="py-4 px-2 text-sm">{currentUser.phone}</td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-2 px-2">EMAIL</td>
                  <td className="py-4 px-2 text-sm">{currentUser.email}</td>
                </tr>
                <tr className="">
                  <td className="text-[#BDBDBD] text-sm py-2 px-2">PASSWORD</td>
                  <td className="py-4 px-2 text-sm">***********</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
