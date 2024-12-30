import axios from "axios";
import React, { useState } from "react";

function Buysignup() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  // const submit = async (e) => {
  //   e.preventDefault();

  //   if (!name || !email || !phoneNumber) {
  //     alert("All fields are required");
  //     return;
  //   }

  //   try {
  //     const config = {
  //       url: "/users/auth/firebaseregister",
  //       method: "post",
  //       baseURL: "https://api.proleverageadmin.in/api",
  //       headers: { "Content-Type": "application/json" },
  //       data: {
  //         name,
  //         email,

  //         phoneNumber,
  //       },
  //     };

  //     const res = await axios(config);

  //     if (res.status === 200) {
  //       console.log("User registered:", res.data.message);

  //       localStorage.setItem("userToken", res.data.token);

  //       // localStorage.setItem("user", JSON.stringify(res.data.user));
  //       window.location.assign("/");

  //       alert("Registered successfully");

  //       // Reset fields or redirect user
  //       setName("");
  //       setEmail("");
  //       setPassword("");
  //       setphoneNumber("");
  //     }
  //   } catch (error) {
  //     console.log("Error during registration:", error);
  //   }
  // };

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

        window.location.assign("/Sign-in");

        alert("Registered successfully");

        setuserName("");
        setEmail("");
        setPassword("");
        setphoneNumber("");
      }
    } catch (error) {
      // Check if the error is from the backend and display the error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show error message from backend
      } else {
        console.log("An unexpected error occurred:", error.message);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div
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
      {/* Left Section - Illustration */}
      <div style={{ width: "50%" }}>
        <img
          src="./images/sigupimg.png"
          alt="Illustration"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Right Section - Sign-Up Form */}
      <div
        style={{
          width: "40%",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <span style={{ color: "#6a11cb", fontWeight: "bold" }}>
          Already have an account?{" "}
        </span>
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
      <h2
        style={{ fontWeight: "600", fontSize: "28px", marginBottom: "10px" }}
      >
        Join Us!
      </h2>
      <p style={{ color: "#7A7A7A", marginBottom: "20px" }}>
        Create an account to get started
      </p> */}

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
            href="/sign-in"
            style={{
              color: "#6a11cb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Log In
          </a>
        </div>
        {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "10px",
        }}
      >
        <button
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <i className="fab fa-google" style={{ color: "#DB4437" }}></i>
        </button>
        <button
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <i className="fab fa-facebook-f" style={{ color: "#4267B2" }}></i>
        </button>
        <button
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <i className="fab fa-twitter" style={{ color: "#1DA1F2" }}></i>
        </button>
      </div> */}
      </div>
    </div>
  );
}

export default Buysignup;
