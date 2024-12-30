import React from "react";
import { Link } from "react-router-dom";

function Flas() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient background
        color: "white",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Welcome to Proleverage!
      </h1>
      <p
        style={{ fontSize: "1.2rem", marginBottom: "40px", maxWidth: "600px" }}
      >
        Enjoy the amazing benefits of our platform. Start with{" "}
        <strong>10 Searches Free for Lifetime!</strong>
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Get Free Button */}
        <Link to="/signup">
          <button
            style={{
              background: "linear-gradient(to right, #32de84, #28a745)", // Button gradient
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            🎉 Get Free
          </button>
        </Link>
        {/* Sign Up Button */}
        <Link to="/Sign-up">
          <button
            style={{
              background: "linear-gradient(to right, #007bff, #0056b3)", // Button gradient
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Buy Now
          </button>
        </Link>
      </div>
      <div
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: "500",
          maxWidth: "400px",
        }}
      >
        🎁 "10 Searches Free for Lifetime" is our special gift to you. Start now
        and unlock the potential!
      </div>
    </div>
  );
}

export default Flas;
