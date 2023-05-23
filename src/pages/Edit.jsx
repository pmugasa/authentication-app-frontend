import Login from "./Login";

function Edit({ currentUser, setCurrentUser }) {
  if (!currentUser) {
    return <Login />;
  }

  //input change
  function handleChange(e) {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }

  //update user details
  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
  }

  return (
    <>
      <div className="">
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
                <label htmlFor="photo" className="flex items-center space-x-4">
                  <img
                    src={currentUser.photoURL}
                    className="h-14 w-14 rounded-md relative hover:cursor-pointer"
                  />
                  <img
                    src="/photo_camera.svg"
                    className="h-7 w-7 absolute hover:cursor-pointer"
                  />

                  <input
                    id="photo"
                    type="file"
                    name="photo"
                    className="hidden"
                    onChange={handleChange}
                  />
                  <span className=" blocktext-sm font-medium cursor-pointer text-[#BDBDBD]">
                    CHANGE PHOTO
                  </span>
                </label>
              </div>
              <div className="my-2">
                <label htmlFor="name" className="text-xs">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
