import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [notification, setnotification] = useState([]);

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");
  console.log("token", token);

  const userstoredata = user ? JSON.parse(user) : null;

  console.log("user", userstoredata);

  const handleremove = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    alert("Account Deleted Successfully");
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
      <nav className="navbar navbar-expand-lg mobile_header navbar-light bg-light">
        <div className="container-fluid">
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

          <ul className="navbar-nav me-0 mb-2 mb-lg-0">
            {/* <li className="nav-item dropdown">
              <a
                className="poppins-regular nav-link dropdown-toggle"
                href="#"
                id="toolsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fa-solid fa-circle-user"
                  style={{ fontSize: "25px" }}
                ></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                <li>
                  <div
                    onClick={handleremove}
                    className="dropdown-item poppins-regular"
                    to="/asin-code"
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </li> */}

            <li>
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/notification"
              >
                <span className="bell">{notification.length}</span>
                <i
                  className="fa-solid fa-bell"
                  style={{ fontSize: "25px" }}
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
