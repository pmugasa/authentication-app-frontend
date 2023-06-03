import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./services/firebase";
//components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [err, setErr] = useState("");
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  //get authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/login");
      } else {
        setCurrentUser(user);
        navigate("/profile");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //this only runs when user is logged in

  //fetching user data from the db
  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;

      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        const data = doc.data();
        setProfile(data);
      });
    }
  }, [currentUser]);

  return (
    <>
      <div className="z-40">
        <Navbar
          profile={profile}
          user={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={profile} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/edit"
          element={<Edit user={currentUser} profile={profile} />}
        />
      </Routes>
    </>
  );
}

export default App;
