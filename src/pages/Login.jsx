import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
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

  //login user with email
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      //setCurrentUser(user);
      setIsDisabled(false);
    } catch (error) {
      setError(error.message);
      setIsDisabled(false);
    }
  };

  //login user with google
  const loginWithGoogle = async () => {
    setIsDisabled(true);
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      // setCurrentUser(user);
      setIsDisabled(false);
    } catch (error) {
      setError(error.message);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-8 border border-[#BDBDBD] w-[400px] h-[480px] my-10 rounded-md">
          <form className="m-auto" onSubmit={handleLogin}>
            <div className="w-[344px] mx-auto my-4">
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <div className="my-4 flex items-center  h-10 w-[344px] p-2 rounded-md border border-[#BDBDBD] focus:border-dark-blue">
                <img src="lock.svg" className="h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="outline-none focus:outline-none w-full h-full ml-2 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#828282] "
                />
              </div>
              <button
                type="submit"
                disabled={isDisabled}
                className=" w-[344px] h-10 rounded-md text-white font-semibold  bg-dark-blue hover:bg-light-blue"
              >
                Login
              </button>
            </div>
          </form>
          <p className="my-2 text-center font-normal text-[14px] text-[#828282]">
            OR
          </p>

          <button
            onClick={loginWithGoogle}
            disabled={isDisabled}
            type="button"
            className=" w-[344px] h-10 rounded-md  text-[#828282] border border-[#828282] font-semibold"
          >
            Login with Google
          </button>

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
