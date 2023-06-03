import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

function Navbar({ user, profile, setCurrentUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(user);
  return (
    <>
      <nav className="w-full py-4 px-2 flex items-center justify-start relative">
        <Link to="/">
          <img src="/devchallenges.svg" />
        </Link>

        {user === null ? null : (
          <div className="ml-auto flex items-center space-x-2 ">
            <img
              onClick={() => setShowDropdown(!showDropdown)}
              src={profile.photoUrl}
              className="w-8 h-8 rounded-md hover:cursor-pointer"
            />
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="hidden sm:flex items-center hover:cursor-pointer "
            >
              <p className="text-dark-gray text-xs font-bold">{profile.name}</p>
              {showDropdown ? (
                <img src="/arrow_drop_up.svg" className="h-6 w-8" />
              ) : (
                <img src="/arrow_drop_down.svg" className="h-6 w-8" />
              )}
            </div>
          </div>
        )}
      </nav>
      {showDropdown && (
        <div
          className="absolute z-30 right-2 sm:top-16 sm:right-16 md:right-20 lg:right-36 bg-[#fafafb]"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Dropdown setCurrentUser={setCurrentUser} />
        </div>
      )}
    </>
  );
}

export default Navbar;
