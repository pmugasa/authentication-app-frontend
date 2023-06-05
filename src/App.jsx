import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { UserContext } from "./contexts/UserContext";
import { ProfileContext } from "./contexts/ProfileContext";
import { onAuthStateChanged } from "firebase/auth";
//components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  //get authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        return navigate("/login");
      } else {
        setCurrentUser(user);
        navigate("/");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log("current user frm app", currentUser.uid);
  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <div className="z-40">
            <Navbar />
          </div>

          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
