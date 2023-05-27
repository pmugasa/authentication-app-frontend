import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../services/supabase";

function Login({ setError, error, setCurrentUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //input changes
  function handleChange(e) {
    setFormData((prevCred) => ({
      ...prevCred,
      [e.target.name]: e.target.value,
    }));
  }
  const navigate = useNavigate();
  //login user with email
  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (!data) {
      return console.log(error);
    }
    //setCurrentUser(data.session.user);
    navigate("/profile");
  }

  //handle login with google
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/profile",
      },
    });
    if (error) {
      console.log("Error signing in", error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-8 border border-[#BDBDBD] w-[400px] h-[480px] my-10 rounded-md">
          <form className="m-auto" onSubmit={handleLogin}>
            <div className="w-[344px] mx-auto my-10">
              <h3 className="my-4 font-bold text-lg text-dark-gray">Login</h3>
              {error && (
                <p className="text-red-500 font-medium text-sm text-center">
                  {error}
                </p>
              )}
              <div className="flex items-center  h-10  p-2 rounded-md border border-[#BDBDBD] focus:border-dark-blue">
                <img src="mail.svg" className="h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <div className="mt-4 flex items-center  h-10 w-[344px] p-2 rounded-md border border-[#BDBDBD] focus:border-dark-blue">
                <img src="lock.svg" className="h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-[344px] h-10 rounded-md text-white font-semibold  bg-dark-blue hover:bg-light-blue"
              >
                Login
              </button>
            </div>
          </form>
          <p className=" mt-8 text-center font-normal text-[14px] text-[#828282]">
            or continue with these social profile
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 ">
            <img
              onClick={handleGoogleLogin}
              src="/Google.svg"
              className="w-10 h-10 cursor-pointer"
            />
            <img src="/Facebook.svg" className="w-10 h-10 cursor-pointer" />
            <img src="/Twitter.svg" className="w-10 h-10 cursor-pointer" />
            <img src="/Github.svg" className="w-10 h-10 cursor-pointer" />
          </div>
          <p className=" mt-8 text-center font-normal text-[14px] text-[#828282]">
            Don't have an account yet?
            <span className="text-dark-blue hover:underline ml-2">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
