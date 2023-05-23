import { Link } from "react-router-dom";
function Dropdown() {
  return (
    <ul className="text-xs text-dark-gray font-medium shadow-lg h-42 w-48 border border-very-light-gray rounded-lg px-4 py-2">
      <li className=" ">
        <Link
          to="/"
          className="flex items-center space-x-2 w-full h-10 px-4 rounded-lg hover:bg-very-light-gray"
        >
          <img src="/account_circle.svg" className="h-4 w-4" />
          <span>My Profile</span>
        </Link>
      </li>
      <div className="border border-very-light-gray my-2 "></div>
      <li className="flex items-center space-x-2 w-full h-10 px-4 rounded-lg hover:bg-very-light-gray">
        <img src="/group.svg" className="h-4 w-4" />
        <span>Group Chat</span>
      </li>
      <div className="border border-very-light-gray my-2 "></div>
      <li className="flex items-center space-x-2 text-warning  w-full h-10 px-4 rounded-lg hover:bg-very-light-gray">
        <img src="/logout.svg" className="h-4 w-4 " />
        <span>Logout</span>
      </li>
    </ul>
  );
}

export default Dropdown;
