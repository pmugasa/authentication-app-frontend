import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <nav className="w-full py-4 flex items-center justify-start relative">
        <Link to="/">
          <img src="/devchallenges.svg" />
        </Link>
        <div className="ml-auto flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNhcnRvb24lMjBjaGFyYWN0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            className="w-8 h-8 rounded-md"
          />
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="hidden sm:flex items-center hover:cursor-pointer "
          >
            <p className="text-dark-gray text-xs font-bold">Xanthe Neal</p>
            {showDropdown ? (
              <img src="/arrow_drop_up.svg" className="h-6 w-8" />
            ) : (
              <img src="/arrow_drop_down.svg" className="h-6 w-8" />
            )}
          </div>
        </div>
      </nav>
      {showDropdown && (
        <div
          className="absolute z-30 sm:top-16 sm:right-16 md:right-20 lg:right-36 bg-[#fafafb]"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Dropdown />
        </div>
      )}
    </>
  );
}

export default Navbar;
