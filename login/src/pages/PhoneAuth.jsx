import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const recaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        }
      );
    }
  };
  const onSignInSubmit = () => {
    setLoading(true);
    recaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPhoneNumber = `+${phoneNumber}`;

    signInWithPhoneNumber(auth, formatPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const onOTPVerify = () => {
    // OTP verification
    setLoading(true);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        console.log("result", result.user.phoneNumber);
        const userI = result.user;
        setUser(userI);
        setLoading(false);
        toast.success("OTP verified successfully");
        axios.post("http://localhost:3001/addPhoneNumber/", {
          email,
          phoneNumber: userI.phoneNumber,
        });
        navigate("/home", { state: { email } });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <div className=" d-flex flex-column mt-5 justify-content-center align-items-center">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {showOTP ? (
        <div className=" d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
          <label className="mt-5 text-light mb-3 fw-bold">Enter Your OTP</label>
          <OTPInput
            autoFocus
            value={code}
            onChange={setCode}
            OTPLength={6}
            otpType="number"
            disabled={false}
          ></OTPInput>
          <button onClick={onOTPVerify} className="btn btn-primary mt-4">
            {loading && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            <span>Verify OTP</span>
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
          <FaPhoneSquareAlt size={50} className="rounded-pill text-light" />
          <h5 className="text-light fw-bold mt-4"> Verify your phone number</h5>
          <div className="d-flex mt-2">
            <PhoneInput
              country={"lk"}
              value={phoneNumber}
              onChange={setPhoneNumber}
            ></PhoneInput>
          </div>
          <button
            className="btn btn-primary mt-3"
            // dataSiteKey="6Ld2GzAnAAAAAPcNZFh2fz9ql0ADu5LCfb8dhdTQ"
            id="sign-in-button"
            onClick={onSignInSubmit}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            Send code via SMS
          </button>
        </div>
      )}
    </div>
  );
};
export default PhoneAuth;
