import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase.config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ setError, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //auth providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();

  //input changes
  function handleChange(e) {
    setFormData((prevCred) => ({
      ...prevCred,
      [e.target.name]: e.target.value,
    }));
  }

  //login with google
  function loginWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  }

  //login with facebook
  function loginWithFacebook() {
    signInWithPopup(auth, facebookProvider)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  }

  //login with twitter
  function loginWithTwitter() {
    signInWithPopup(auth, twitterProvider)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  }

  //login with github
  function loginWithGithub() {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  }

  //login user with email
  function handleLogin(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("ERROR", err.message);
        setError(err.message.substr(err.message.indexOf(" ") + 1));
      });
  }

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
              onClick={loginWithGoogle}
              src="/Google.svg"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              onClick={loginWithFacebook}
              src="/Facebook.svg"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              onClick={loginWithTwitter}
              src="/Twitter.svg"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              onClick={loginWithGithub}
              src="/Github.svg"
              className="w-10 h-10 cursor-pointer"
            />
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
