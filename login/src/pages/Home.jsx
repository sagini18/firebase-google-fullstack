import { useAuth } from "../pages/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const API_BASE = "http://localhost:3001";
  const { googleSignOut, user } = useAuth();
  const location = useLocation();
  const email = location?.state?.email;
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    googleSignOut();
    navigate("/");
  };
  useEffect(() => {
    const emaill = user?.email || email;
    if (emaill !== undefined) {
      axios
        .get(API_BASE + "/users/" + emaill)
        .then((res) => {
          if (res.data !== "" && res.data !== undefined) {
            console.log("current username:", res.data);
            setUsername(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }

    if (user?.displayName !== undefined) {
      axios
        .post(API_BASE + "/register/", {
          name: user?.displayName,
          email: user?.email,
          token: user?.accessToken,
        })
        .then((res) => setIsLoading(false))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return isLoading ? (
    <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
      <div className="spinner-grow" role="status"></div>
    </div>
  ) : (
    <div className="d-flex flex-column align-items-center mt-5 pt-5">
      <h4>Welcome {username ? username : user?.displayName}!</h4>
      <img src={user?.photoURL} className="rounded-circle" />
      <button className="btn btn-primary mt-5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
