import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const payload = {
        mobileNumber: "1234567890",
      };
      //  "mobileNumber":"1234567890"
      // "otp": "rDeEBy"
      const response = await axios.post(
        "https://kv-varlu.vercel.app/api/v1/login",
        payload
      );
      if (response.status === 200) {
        setIsOtpSent(true);
        setOtp(response.data.otp);
        toast.success("otp sent successfully");
        console.log(response.data.otp);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("mobileNumber not valid", error);
    }
  };

  const handleLogin = async () => {
    // Add your login logic here
    try {
      const payload = {
        mobileNumber: "1234567890",
        otp: otp,
      };

      const response = await axios.post(
        "https://kv-varlu.vercel.app/api/v1/verify/login",
        payload
      );
      if (response.status === 200) {
        toast.success("loged In Successfully");
        setTimeout(() => {
          navigate("/Browse");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            minWidth: "400px",
            minHeight: "60px",
            fontSize: "20px",
          },
        }}
      />

      <div className="login-form">
        <h2>Login</h2>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        {isOtpSent ? (
          <>
            <input type="text" placeholder="OTP" />
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <button onClick={handleSendOtp}>Send OTP</button>
        )}
      </div>
    </>
  );
};

export default Login;
