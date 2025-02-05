import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function Signup() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber) {
      alert("All fields are required");
      return;
    }

    try {
      const config = {
        url: "/users/auth/firebaseregister",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "Content-Type": "application/json" },
        data: {
          username,
          email,
          phoneNumber,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        console.log("User registered:", res.data.message);
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.assign("/login");
        toast.success("Registered successfully");
        setuserName("");
        setEmail("");
        setPassword("");
        setphoneNumber("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.success(error.response.data.error);
      } else {
        console.log("An unexpected error occurred:", error.message);
        toast.success("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div
        className="web-tools"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
          fontFamily: "Poppins, sans-serif",
          color: "#4A4A4A",
          padding: "0 10%",
        }}
      >
        <div style={{ width: "50%" }}>
          <img
            src="./images/sigupimg.png"
            alt="Illustration"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div
          style={{
            width: "40%",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="d-flex justify-content-center mb-4">
            <a className="navbar-brand" to="/">
              <img
                src="./images/plogo.png"
                alt="loading...."
                style={{
                  height: "50px",
                  width: "200px",
                }}
              />
            </a>
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <i
                  className="fas fa-user"
                  style={{ marginRight: "10px", color: "#6a11cb" }}
                ></i>
                <input
                  type="text"
                  className="col-md-12"
                  placeholder="Enter Your Name"
                  value={username}
                  onChange={(e) => setuserName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "10px", color: "#6a11cb" }}
                ></i>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "10px", color: "#6a11cb" }}
                ></i>
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          <div
            className="mt-3"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <span style={{}}>Already have an account? </span>
            <a
              href="/login"
              style={{
                color: "#6a11cb",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Log In
            </a>
          </div>
        </div>
      </div>
      <div className="mobile-tools">
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "20px",
            background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="d-flex justify-content-center mb-4">
              <img
                src="./images/plogo.png"
                alt="loading..."
                style={{ height: "50px", maxWidth: "100%" }}
              />
            </div>
            <form onSubmit={submit}>
              <div style={{ marginBottom: "15px", width: "100%" }}>
                {/* <i
                    className="fas fa-user"
                    style={{ marginRight: "10px", color: "#6a11cb" }}
                  ></i> */}
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={username}
                  onChange={(e) => setuserName(e.target.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "100%",
                    paddingLeft: "15px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px", width: "100%" }}>
                {/* <i
                    className="fas fa-envelope"
                    style={{ marginRight: "10px", color: "#6a11cb" }}
                  ></i> */}
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "100%",
                    paddingLeft: "15px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px", width: "100%" }}>
                {/* <i
                    className="fas fa-phone"
                    style={{
                      marginRight: "10px",
                      color: "#6a11cb",
                      position: "absolute",
                      top: "10px",
                    }}
                  ></i> */}
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "100%",
                    paddingLeft: "15px",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            </form>
            <div className="mt-3" style={{ textAlign: "center" }}>
              <span>Already have an account? </span>
              <a
                href="/login"
                style={{
                  color: "#6a11cb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
