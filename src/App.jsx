import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

//components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  const [session, setSession] = useState(null);
  const [avatar_url, setAvatarUrl] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  //get authenticated user
  useEffect(() => {
    const getUser = async () => {
      //get user session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      //listening to changes in user auth
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
        if (!session) {
          navigate("/login");
        } else {
          setSession(session);
          navigate("/profile");
        }
      });
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handling errors
  useEffect(() => {
    if (err) {
      const timeoutId = setTimeout(() => {
        setErr("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [err]);
  return (
    <>
      <div className="z-40">
        <Navbar session={session} avatar_url={avatar_url} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Profile
              session={session}
              avatar_url={avatar_url}
              setAvatarUrl={setAvatarUrl}
            />
          }
        />
        <Route
          path="/login"
          element={<Login error={err} setError={setErr} />}
        />
        <Route
          path="/register"
          element={<Register error={err} setError={setErr} />}
        />
        <Route
          path="/edit"
          element={<Edit session={session} avatar_url={avatar_url} />}
        />
      </Routes>
    </>
  );
}

export default App;
