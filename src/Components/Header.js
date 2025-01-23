import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");
  const [notification, setnotification] = useState([]);

  console.log("token", token);

  const userstoredata = user ? JSON.parse(user) : null;

  console.log("user", userstoredata);

  const handleremove = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    alert("logout successfull");
  };

  useEffect(() => {
    getallnotification();
  }, []);

  const getallnotification = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/broadcasting/getallbroadcast"
      );
      if (response.status === 200) {
        setnotification(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching keyword data:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg web-header navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="/asin-code">
            <img
              src="./images/plogo.png"
              alt="loading...."
              style={{
                height: "50px",
                width: "200px",
              }}
            />
          </a>

          {/* Navbar Items */}
          <ul className="navbar-nav me-0 mb-2 mb-lg-0">
            {/* Home Link */}
            <li
              className={`nav-item ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/home"
              >
                Home
              </Link>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/chat" ? "active" : ""
              }`}
            >
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/chat"
              >
                Chat
              </Link>
            </li>

            {/* Tools Dropdown */}
            {/* <li className="nav-item dropdown">
              <a
                className="poppins-regular nav-link dropdown-toggle"
                href="#"
                id="toolsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tools
              </a>
              <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/asin-code"
                  >
                    ASIN Keyword
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/black-box"
                  >
                    Black Box
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a
                className="poppins-regular nav-link dropdown-toggle"
                href="#"
                id="toolsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#343a40",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#007bff")}
                onMouseOut={(e) => (e.target.style.color = "#343a40")}
              >
                Tools
              </a>
              <ul
                className="dropdown-menu shadow-lg border-0"
                aria-labelledby="toolsDropdown"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                }}
              >
                <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/asin-code"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      padding: "10px",
                      borderRadius: "6px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i
                      className="fa-solid fa-key me-2"
                      style={{ color: "#007bff", fontSize: "16px" }}
                    ></i>
                    ASIN Keyword
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/black-box"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      padding: "10px",
                      borderRadius: "6px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i
                      className="fa-solid fa-box-open me-2"
                      style={{ color: "#007bff", fontSize: "16px" }}
                    ></i>
                    Black Box
                  </Link>
                </li>
              </ul>
            </li> */}

            <li
              className={`nav-item ${
                location.pathname === "/asin-code" ? "active" : ""
              }`}
            >
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/asin-code"
              >
                Tools
              </Link>
            </li>

            {/* User Profile Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="poppins-regular nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fa-solid fa-circle-user"
                  style={{ fontSize: "23px" }}
                ></i>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="profileDropdown"
                style={{ marginLeft: "-30px" }}
              >
                <li>
                  <Link
                    onClick={handleremove}
                    className="dropdown-item poppins-regular"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/notification" ? "active" : ""
              }`}
            >
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/notification"
              >
                <span className="bell">{notification.length}</span>
                <i
                  className="fa-solid fa-bell"
                  style={{ fontSize: "22px" }}
                ></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
