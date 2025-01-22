import React from "react";
import { Link } from "react-router-dom";

function Mobilefooter() {
  return (
    <div
      className="mobile-tools"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient background
        // padding: "10px",
        margin: "15px",
        borderRadius: "30px", // Rounded corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Shadow for better UI
        position: "fixed",
        bottom: "0px", // Fixed at the bottom
        left: "0", // Ensure it aligns properly on the left
        right: "0", // Ensure it aligns properly on the right
        padding: "10px", // Add padding for content
        zIndex: "1000",
      }}
    >
      <div
        className="d-flex justify-content-around align-items-center"
        style={{ padding: "10px 0" }}
      >
        <Link to="/asin-code">
          <div className="text-center">
            <i
              className="fa-solid fa-toolbox"
              style={{
                color: "white",
                fontSize: "20px", // Larger icon
                marginBottom: "5px",
              }}
            ></i>
            <div
              className="poppins-regular"
              style={{
                fontSize: "14px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Tools
            </div>
          </div>
        </Link>

        <Link to="/home">
          <div className="text-center">
            <i
              className="fa-solid fa-house"
              style={{
                color: "white",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            ></i>

            <div
              className="poppins-regular"
              style={{
                fontSize: "14px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Home
            </div>
          </div>
        </Link>

        <Link to="/chat">
          <div className="text-center">
            <i
              className="fa-brands fa-rocketchat"
              style={{
                color: "white",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            ></i>

            <div
              className="poppins-regular"
              style={{
                fontSize: "14px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Chat
            </div>
          </div>
        </Link>

        <div className="text-center">
          <i
            className="fa-solid fa-user"
            style={{
              color: "white",
              fontSize: "20px",
              marginBottom: "5px",
            }}
          ></i>

          <div
            className="poppins-regular"
            style={{
              fontSize: "14px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Profile
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobilefooter;
