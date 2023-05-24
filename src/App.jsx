import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.config";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  //attaching on auth observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        setCurrentUser(user);
      } else {
        console.log("user logged out");
      }
    });
  }, []);

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
  return (
    <>
      <div className="z-40">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>

      <Routes>
        <Route path="/" element={<Profile currentUser={currentUser} />} />
        <Route
          path="/login"
          element={<Login error={error} setError={setError} />}
        />
        <Route
          path="/register"
          element={<Register error={error} setError={setError} />}
        />
        <Route
          path="/edit"
          element={
            <Edit currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
