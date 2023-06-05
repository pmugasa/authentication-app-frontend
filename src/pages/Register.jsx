import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const setCurrentUser = useContext(UserContext);
  //handling errors
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);
  // registering user with email & password
  const registerUser = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        //setCurrentUser(user);
        setIsDisabled(false);
      })
      .catch((err) => setError(err.message));
  };

  //sign up user with google
  const registerWithGoogle = () => {
    setIsDisabled(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user;
        //setCurrentUser(user);
        setIsDisabled(false);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="border border-[#BDBDBD] w-[400px] h-[500px] my-10 px-8 rounded-md">
          <form className="m-auto" onSubmit={registerUser}>
            <div className="w-[344px] mx-auto my-8">
              <h3 className="my-2 font-bold text-lg text-dark-gray">
                Join thousands of learners from around the world
              </h3>
              {error && (
                <p className="text-red-500 font-medium text-sm text-center">
                  {error}
                </p>
              )}
              <p className="font-normal text-sm text-dark-gray mb-6">
                Master web development by making real-life projects. There are
                multiple paths for you to choose.
              </p>

              <div className="flex items-center  h-10  p-2 rounded-md border border-[#BDBDBD] focus:border-dark-blue">
                <img src="mail.svg" className="h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  autoComplete="none"
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <button
                disabled={isDisabled}
                type="submit"
                className="mt-4 w-[344px] h-10 rounded-md text-white font-semibold  bg-dark-blue hover:bg-light-blue"
              >
                Start coding now
              </button>
            </div>
          </form>
          <p className=" my-4 text-center font-normal text-[14px] text-[#828282]">
            OR
          </p>
          <button
            onClick={registerWithGoogle}
            type="button"
            className=" w-[344px] h-10 rounded-md  text-[#828282] border border-[#828282] font-semibold "
          >
            Register with Google
          </button>
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
