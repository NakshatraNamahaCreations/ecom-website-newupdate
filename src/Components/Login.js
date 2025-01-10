import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const userdata = localStorage.getItem("user");
  console.log("userdata", userdata);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible", callback: onSignup },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        VerifyFromServer();
        toast.success("Otp verified!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid OTP, please try again.");
        setLoading(false);
      });
  }

  async function VerifyFromServer() {
    try {
      const cleanedPhoneNumber = ph.startsWith("91") ? ph.slice(2) : ph;

      const config = {
        url: "/users/auth/firebaselogin",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "Content-Type": "application/json" },
        data: {
          phoneNumber: cleanedPhoneNumber,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        console.log("Success");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.assign("/asin-code");
        setUser(response.data);
        setLoading(false);
      } else {
        window.location.assign("/signup");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      window.location.assign("/signup");
    }
  }

  return (
    <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center min-h-screen">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        {user ? (
          <h2 className="text-center text-green-500 font-semibold text-2xl">
            🎉 Login Successful
          </h2>
        ) : (
          <div>
            <img
              src={showOTP ? "./images/plogo.png" : "./images/plogo.png"}
              alt="Illustration"
              className="mx-auto mb-6"
              style={{
                height: "50px",
                width: "200px",
              }}
            />

            <h1 className="text-center text-2xl font-semibold text-gray-700 mb-2 poppins-medium">
              {showOTP ? "Verification Code" : "Verify Your Number"}
            </h1>
            <p className="text-center text-gray-500 mb-6 poppins-regular">
              {showOTP
                ? "Please enter the code sent to your phone"
                : "Please enter your Country & your Phone Number"}
            </p>

            {showOTP ? (
              <>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  className="flex justify-center gap-2 mb-4 opt-container"
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    border: "1px solid grey",
                    borderRadius: "0.5rem",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                />
                {/* <button
                  onClick={onOTPVerify}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full py-3 rounded-lg transition-all"
                > */}
                <div
                  onClick={onOTPVerify}
                  className="relative text-center bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {loading ? (
                    <CgSpinner size={20} className="animate-spin mx-auto" />
                  ) : (
                    "Verify OTP"
                  )}
                  {/* </button> */}
                </div>
                {/* <button
                  className="mt-4 text-indigo-500 hover:underline w-full text-center"
                  onClick={onSignup}
                >
                  Resend Code
                </button> */}
              </>
            ) : (
              <>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  inputStyle={{
                    width: "100%",
                    height: "3rem",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                  className="mb-4 poppins-regular"
                />
                <div
                  onClick={onSignup}
                  className="relative text-center bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {loading ? (
                    <CgSpinner size={20} className="animate-spin mx-auto" />
                  ) : (
                    "Send OTP"
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default Login;
