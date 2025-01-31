import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    // Fetch the user data from localStorage
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserdata(parsedUser); // Update state with user data
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  console.log("userData", userData);

  const handleremove = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    alert("logout successfull");
  };

  return (
    <div className="mobile-tools" style={{ margin: "25px" }}>
      <div
        className="row "
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient background
          padding: "10px",
          borderRadius: "15px", // Rounded corners
          //   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <i
            className="fa-solid fa-circle-user"
            style={{ fontSize: "40px", color: "white", textAlign: "center" }}
          ></i>
        </div>
        <div
          className="poppins-regular text-center mt-1"
          style={{ color: "white" }}
        >
          {userData?.username}
        </div>
        <div
          className="poppins-regular text-center mt-1"
          style={{ color: "white" }}
        >
          {userData?.email}
        </div>
        <div
          className="poppins-regular text-center mt-1"
          style={{ color: "white" }}
        >
          {userData?.phoneNumber}
        </div>
      </div>

      <div
        onClick={handleremove}
        className="d-flex mt-5"
        style={{
          backgroundColor: "lightgrey",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <div className="col-md-1">
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
        <div className="col-md-11">
          <div className="poppins-semibold text-center mx-3">Logout</div>
        </div>
      </div>

      <Link to="/Plans" style={{ textDecoration: "none" }}>
        <div
          className="d-flex mt-4"
          style={{
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div className="col-md-1">
            <i
              className="fa-solid fa-money-bill"
              style={{ fontSize: "20px", color: "black" }}
            ></i>
          </div>
          <div className="col-md-11">
            <div
              className="poppins-semibold text-center mx-3"
              style={{ color: "black" }}
            >
              Subscriptions
            </div>
          </div>
        </div>
      </Link>

      {/* <Link to="/Plans" style={{ textDecoration: "none" }}> */}
      <div
        className="d-flex mt-4"
        style={{
          backgroundColor: "lightgrey",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <div className="col-md-1">
          <i
            className="fa-solid fa-money-bill"
            style={{ fontSize: "20px", color: "black" }}
          ></i>
        </div>
        <div className="col-md-11">
          <div
            className="poppins-semibold text-center mx-3"
            style={{ color: "black" }}
          >
            Payment History
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}
export default Profile;
