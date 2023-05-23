import { Routes, Route, useNavigate } from "react-router-dom";
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
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
  console.log("user state", currentUser);

  return (
    <>
      <div className="z-40">
        <Navbar currentUser={currentUser} />
      </div>

      <Routes>
        <Route path="/" element={<Profile currentUser={currentUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
