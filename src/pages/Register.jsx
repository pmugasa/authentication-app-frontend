import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

function Register({ error, setError }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //input changes
  function handleChange(e) {
    setFormData((prevCred) => ({
      ...prevCred,
      [e.target.name]: e.target.value,
    }));
  }
  //auth providers
  const googleProvider = new GoogleAuthProvider();
  //register with google
  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userId = result.user.uid;
      await setDoc(doc(db, "users", userId), {
        bio: "",
      });
      navigate("/");
      console.log("USER ID", userId);
    } catch (err) {
      (err) => setError(err.message);
    }
  }
  // registering user with email & password
  async function registerUser(e) {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const id = newUser.user.uid;
      await setDoc(doc(db, "users", id), {
        bio: "",
      });
      navigate("/");
    } catch (err) {
      (err) => setError(err.message);
    }
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="border border-[#BDBDBD] w-[400px] h-[500px] my-10 px-8 rounded-md">
          <form className="m-auto" onSubmit={registerUser}>
            <div className="w-[344px] mx-auto my-8">
              <h3 className="my-2 font-bold text-lg text-dark-gray">
                Join thousands of learners from around the world
              </h3>

              <p className="font-normal text-sm text-dark-gray mb-6">
                Master web development by making real-life projects. There are
                multiple paths for you to choose.
              </p>
              {error && (
                <p className="text-red-500 font-medium text-sm text-center my-2">
                  {error}
                </p>
              )}
              <div className="flex items-center  h-10  p-2 rounded-md border border-[#BDBDBD] focus:border-dark-blue">
                <img src="mail.svg" className="h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  autoComplete="none"
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
                  autoComplete="none"
                  onChange={handleChange}
                  placeholder="Password"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-[344px] h-10 rounded-md text-white font-semibold  bg-dark-blue hover:bg-light-blue"
              >
                Start coding now
              </button>
            </div>
          </form>
          <p className=" mt-4 text-center font-normal text-[14px] text-[#828282]">
            or continue with these social profile
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 ">
            <img
              onClick={loginWithGoogle}
              src="/Google.svg"
              className="w-10 h-10 cursor-pointer"
            />
            <img src="/Facebook.svg" className="w-10 h-10 cursor-pointer" />
            <img src="/Twitter.svg" className="w-10 h-10 cursor-pointer" />
            <img src="/Github.svg" className="w-10 h-10 cursor-pointer" />
          </div>
          <p className=" mt-6 text-center font-normal text-[14px] text-[#828282]">
            Already a member?
            <span className="text-dark-blue hover:underline ml-2">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
