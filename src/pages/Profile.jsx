import { Link } from "react-router-dom";
function Profile() {
  return (
    <>
      <div className="z-10">
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
                      src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNhcnRvb24lMjBjaGFyYWN0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                      className="w-10 h-10 rounded-md "
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#E0E0E0] ">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">NAME</td>
                  <td className="py-4 px-2 text-sm">Xante Neal</td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">BIO</td>
                  <td className="py-4 px-2 text-sm">
                    I am a software developer and a big fan of devchallenge.io
                    and frontend mentor
                  </td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-4 px-2">PHONE</td>
                  <td className="py-4 px-2 text-sm">908249274292</td>
                </tr>
                <tr className="border-b border-[#E0E0E0]">
                  <td className="text-[#BDBDBD] text-sm py-2 px-2">EMAIL</td>
                  <td className="py-4 px-2 text-sm">xanthe.neal@gmail.com</td>
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
