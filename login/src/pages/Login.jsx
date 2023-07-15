import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { useAuth } from "./AuthContext";
import { auth } from "../firebase";

const Login = () => {
  const API_BASE = "http://localhost:3001";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_BASE + "/login", { email, password })
      .then((res) =>
        res.data === "Success"
          ? navigate("/home", { state: { email } })
          : res.data === "Incorrect Password"
          ? alert(" Incorrect password")
          : navigate("/")
      )
      .catch((err) => console.log(err));
  };
  const { googleSignIn } = useAuth();
  const { user } = useAuth();
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      if (user.displayName !== "") {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column w-25 align-items-center">
      <h4>Login</h4>
      <input
        placeholder="Enter Email"
        type="text"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <br></br>
      <input
        placeholder="Enter Password"
        type="password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>
      <button className="btn btn-primary mb-5" onClick={(e) => handleSubmit(e)}>
        Login
      </button>
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  );
};

export default Login;
