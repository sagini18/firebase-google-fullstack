import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./pages/AuthContext";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PhoneAuth from "./pages/PhoneAuth";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="phoneNumberVerification" element={<PhoneAuth />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
