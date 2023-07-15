import axios from "axios";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

const Signup = () => {
  const API_BASE = "http://localhost:3001";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleSignIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_BASE + "/register", { name, email, password })
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));
  };
  const handleLogin = () => {
    googleSignIn();
    navigate("/Home");
  };
  return (
    <div className="App d-flex align-items-center flex-column mt-5">
      <div className="d-flex flex-column w-25 align-items-center">
        <h4>Register</h4>
        <input
          placeholder="Enter Name"
          type="text"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
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
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Save
        </button>
      </div>
      <br></br>
      <h6>Already Have Account</h6>
      <Link to="/login">
        <button className="btn btn-success">Login</button>
      </Link>
      <GoogleButton className="mt-5" onClick={handleLogin}></GoogleButton>
    </div>
  );
};

export default Signup;
