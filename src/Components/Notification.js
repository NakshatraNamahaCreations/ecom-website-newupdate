import axios from "axios";
import React, { useEffect, useState } from "react";

function Notification() {
  const [notification, setnotification] = useState([]);

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

  console.log("notification", notification);
  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-md-5">
          <div className="row mt-4">
            {notification.map((data) => (
              <div
                className="d-flex mb-3"
                style={{
                  backgroundColor: "lightgrey",
                  padding: "15px",
                  borderRadius: "5px",
                }}
              >
                <div className="col-md-2">
                  {/* <img
                    src={`https://api.proleverageadmin.in/createbroadcast/${data.image}`}
                    alt="loading"
                    style={{ width: "100px", height: "100px" }}
                  /> */}
                  <img
                    src="./images/ecom-logo-up.png"
                    style={{
                      borderRadius: "5px",
                      width: "50px",
                      height: "50px",
                    }}
                    alt="loading..."
                  />
                </div>
                <div
                  className="col-md-8 d-flex"
                  style={{ alignItems: "center" }}
                >
                  <div className="poppins-regular">{data?.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
