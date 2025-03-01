import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Header1 from "./Header1";

const Asin = () => {
  const [asin, setAsin] = useState("");
  const [country, setCountry] = useState("IN");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(100);
  const [feeDetails, setFeeDetails] = useState({});
  const [dailySales, setDailySales] = useState(0);
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [asindata, setasindata] = useState([]);
  const [isAsinExists, setIsAsinExists] = useState(false);
  const [alluserdata, setalluserdata] = useState([]);
  const [userData, setUserdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserdata(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
      navigate("/login");
    }
  }, [navigate]);

  console.log("userData", userData);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const calculateFees = () => {
    let referralFee;
    let closingFee;
    const taxRate = 0.18;
    if (price <= 300) {
      referralFee = price * 0.05;
    } else if (price > 300 && price <= 500) {
      referralFee = price * 0.09;
    } else if (price > 500) {
      referralFee = price * 0.13;
    }
    if (price <= 250) {
      closingFee = 4;
    } else if (price > 250 && price <= 500) {
      closingFee = 9;
    } else if (price > 500 && price <= 1000) {
      closingFee = 30;
    } else if (price > 1000) {
      closingFee = 61;
    }

    const tax = (referralFee + closingFee) * taxRate;
    const costPerUnit = referralFee + closingFee + tax;
    const totalCost = price + costPerUnit;
    setFeeDetails({
      price,
      referralFee,
      closingFee,
      tax,
      costPerUnit,
      totalCost,
    });
  };

  const calculateDailySales = (itemPrice) => {
    const estimatedDailySales = itemPrice * 0.1;
    setDailySales(estimatedDailySales);
  };

  useEffect(() => {
    if (price) {
      calculateFees();
    }
  }, [price]);

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  console.log("data====", data);

  const handlePayment = () => {
    setShowPaymentModal(false);
    // Initiate payment process (Razorpay or other)
    console.log("Proceeding to payment...");
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment gateway
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "https://api.proleverageadmin.in/orders",
        {
          amount: 100, // Amount in paise (₹1997)
          currency: "INR",
        }
      );
      setOrderId(response.data.order_id); // Save order ID for later verification
      return response.data.order_id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handlePayment1 = async () => {
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const orderId = await createOrder(); // Create Razorpay order
      if (!orderId) {
        throw new Error("Order ID not generated");
      }

      const options = {
        key: "rzp_live_yzuuxyiOlu7Oyj", // Replace with your Razorpay key
        amount: 100, // Amount in paise
        currency: "INR",
        name: "Proleveragea",
        description: "Payment for additional search count",
        order_id: orderId,
        handler: async function(response) {
          try {
            // Verify payment on the backend
            const verifyResponse = await axios.get(
              `https://api.proleverageadmin.in/api/payment/payment/${response.razorpay_payment_id}`,
              {
                params: { userId: userData?._id }, // Pass userId dynamically
              }
            );

            if (verifyResponse.data.paymentStatus) {
              // Redirect to success page
              setShowPaymentModal(false);
              window.location.href = "/asin-code";
            } else {
              // Redirect to failure page if payment status is false
              window.location.href = "/payment-failure";
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Redirect to failure page on error
            window.location.href = "/payment-failure";
          }
        },
        prefill: {
          name: userData?.name || "Customer Name",
          email: userData?.email || "customer@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      // Handle payment closure by the user
      rzp1.on("payment.failed", function(response) {
        console.error("Payment failed:", response.error);
        // Redirect to failure page on user closure
        window.location.href = "/payment-failure";
      });

      rzp1.open();
    } catch (error) {
      console.error("Error handling payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getuser();
    }
  }, [userData, alluserdata]);

  const getuser = async () => {
    if (!userData?._id) {
      console.error("User ID is undefined, cannot fetch user data.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/users/getparticularuser/${userData._id}`
      );
      if (response.status === 200) {
        setalluserdata(response.data.data); // Store user data in state
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserSearchCount = async (userId) => {
    try {
      await axios.post(
        "https://api.proleverageadmin.in/api/user/update-searchcount",
        {
          userId: userData?._id,
        }
      );
      console.log("Search count updated successfully.");
    } catch (error) {
      console.error("Error updating search count:", error);
    }
  };

  const handleSearch = async () => {
    if (!asin) {
      setError("Please enter a valid ASIN.");
      return;
    }

    if (alluserdata.searchcount >= alluserdata.searchLimit) {
      setError("You have reached your search limit. Please upgrade your plan.");
      window.location.assign("/Plans"); // Redirect to Plans page
      return;
    }

    const filteredData = asindata.filter((item) => item.asin === asin);

    if (filteredData.length > 0) {
      setData(filteredData[0]);
      await updateUserSearchCount(userData?._id);
      setIsAsinExists(true);

      setError("");
      return;
    } else {
      setIsAsinExists(false);

      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://api.proleverageadmin.in/api/amazon/affiliatekeyword1",
          {
            params: { asin, country, userId: userData?._id },
          }
        );

        if (response.data.data && Object.keys(response.data.data).length > 0) {
          setData(response.data.data);

          await addasindata({
            userId: "676cdf46a70e449880e336e4",
            category: response.data.data.category?.name || "",
            sales_volume: response.data.data.sales_volume || "",
            product_price: response.data.data.product_price || "",
            asin: response.data.data.asin || "",
            product_title: response.data.data.product_title || "",
            product_star_rating: response.data.data.product_star_rating || "",
            product_num_ratings: response.data.data.product_num_ratings || "",
            product_url: response.data.data.product_url || "",
            product_photo: response.data.data.product_photo || "",
          });

          // await updateUserSearchCount("676cdf46a70e449880e336e4");
        } else {
          setData([]);
          setError("ASIN code is incorrect or no data available.");
        }
      } catch (err) {
        const backendError =
          err.response?.data?.error || "An unexpected error occurred.";
        setError(backendError);
        window.location.assign("/Plans");
        console.error("Error fetching data:", err.message);
      }
      setLoading(false);
    }
  };

  console.log("data", data);

  useEffect(() => {
    getasindata();
  }, []);

  const addasindata = async (asinData) => {
    try {
      const config = {
        url: "/addasin",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "Content-Type": "application/json" },
        data: asinData, // Pass the ASIN data directly here
      };

      const response = await axios(config);

      if (response.status === 200) {
        // alert("Successfully added ASIN data");
        // window.location.assign("/asin-code"); // Redirect to ASIN list page
      }
    } catch (error) {
      console.error("Error adding ASIN data:", error);
      alert("An error occurred while adding ASIN data. Please try again.");
    }
  };

  const getasindata = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/getallasin"
      );
      if (response.status === 200) {
        setasindata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("asindata===", asindata);

  console.log("country", country);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // To show time in AM/PM format
    });
  };

  const remainingcount = alluserdata.searchLimit - alluserdata.searchcount;

  return (
    <div className="container">
      <div className="container-fluid d-flex align-items-center web-tools mt-5">
        <div className="row w-100  rounded-4 overflow-hidden bg-white web-tools">
          {/* Left Panel */}
          <div className="col-md-7 p-5">
            <div className="text-center mb-4">
              <h2
                className="poppins-regular text-primary"
                style={{ fontSize: "16px" }}
              >
                ASIN/Product Search
              </h2>
              <p className="text-muted poppins-regular">
                Search for Amazon products using ASIN codes.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-center gap-3 mb-4">
              <button className="btn btn-primary w-25">ASIN/Product</button>
              <Link
                to="/product-search"
                className="btn btn-outline-primary w-25"
              >
                Keyword
              </Link>
              <Link to="/black-box" className="btn btn-outline-primary w-25">
                Blackbox
              </Link>
            </div>

            {/* User Data */}
            {alluserdata && (
              <div className="text-muted small">
                <p
                  className="poppins-regular"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Remaining Count: {remainingcount}
                </p>
                {/* <p
                  className="poppins-regular"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Search Limit: {alluserdata.searchLimit}
                </p> */}
              </div>
            )}

            {/* Country Selector */}
            <div className="row mt-3 mb-3">
              <div className="col-md-12">
                <div className="custom-select-container">
                  <select
                    className="form-select custom-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="IN" className="flag-option">
                      amazon.in
                    </option>
                    <option value="US" className="flag-option">
                      amazon.com
                    </option>
                  </select>
                  <div className="flag-container">
                    {country === "IN" && (
                      <img
                        src="https://flagcdn.com/w40/in.png"
                        alt="India Flag"
                        className="flag-icon"
                      />
                    )}
                    {country === "US" && (
                      <img
                        src="https://flagcdn.com/w40/us.png"
                        alt="United States Flag"
                        className="flag-icon"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-3">
              <label className="form-label fw-semibold">Enter ASIN Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., B0D3R1JQ7D"
                value={asin}
                onChange={(e) => setAsin(e.target.value)}
              />
            </div> */}

            <div className="row mt-3 mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., B0D3R1JQ7D"
                  value={asin}
                  onChange={(e) => setAsin(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary search_icon"
                  type="submit"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {data && Object.keys(data).length > 0 && (
              <div>
                <Link
                  to="/asin-details"
                  state={{ data, dailySales: dailySales }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="row mt-3" key={data.asin}>
                    <div className="col-2">
                      <img
                        src={data.product_photo}
                        alt={data.product_title}
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div
                      className="col-10 d-flex"
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "grey",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {data.product_title}
                      </div>
                      <div className="poppins-medium">
                        {data.country === "US"
                          ? `$${data.product_price}`
                          : `Rs. ${data.product_price}`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="col-md-5 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
            <img
              src="./images/asinimg.png"
              alt="Illustration"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      <div className="mobile-tools">
        <div className="row mt-3 mb-3">
          <div className="col-md-12">
            <div
              className="d-flex align-items-center"
              style={{ width: "100%" }}
            >
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  flex: "1",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                  marginRight: "10px",
                }}
              >
                <option value="IN" className="flag-option">
                  amazon.in
                </option>
                <option value="US" className="flag-option">
                  amazon.com
                </option>
              </select>
              <img
                src={
                  country === "IN"
                    ? "https://flagcdn.com/w40/in.png"
                    : "https://flagcdn.com/w40/us.png"
                }
                alt={`${country} Flag`}
                style={{
                  width: "30px",
                  height: "auto",
                  borderRadius: "5px",
                  position: "absolute",
                  right: "63px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="row" style={{}}>
          <div className="col-6">
            <div
              className="poppins-regular"
              style={{
                backgroundColor: "darkblue",
                color: "white",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              ASIN/Product
            </div>
          </div>

          <div className="col-6">
            <Link to="/product-search" style={{ textDecoration: "none" }}>
              <div
                className="poppins-regular"
                style={{
                  // backgroundColor: "darkblue",
                  border: "1px solid darkblue",
                  color: "black",

                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Keyword
              </div>
            </Link>
          </div>
        </div>

        <div className="d-flex mt-3">
          <div className="col-10">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                marginTop: "14px",
                marginLeft: "15px",
              }}
            ></i>
            <input
              type="text"
              className="col-12 poppins-regular"
              placeholder="ASIN Search"
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
              style={{
                outline: "none",
                height: "45px",
                paddingLeft: "45px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid lightgrey",
              }}
            />
          </div>

          <div className="col-md-2 mx-2">
            <div
              className=" search_icon "
              type="submit"
              // onClick={search}
              onClick={handleSearch}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <i
                  onClick={handleSearch}
                  className="fa-solid fa-magnifying-glass"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "darkblue",
                    color: "white",
                    padding: "12px",
                    borderRadius: "5px",
                  }}
                ></i>
              )}
            </div>
          </div>
        </div>

        {/* {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )} */}

        <div className="row mt-4" style={{ justifyContent: "center" }}>
          {alluserdata ? (
            <>
              <p
                className="user-info poppins-regular"
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {/* {alluserdata.searchcount}/{alluserdata.searchLimit} */}
                Remaining Count: {remainingcount}
              </p>

              <div
                className="poppins-regular mb-3"
                style={{ textAlign: "center", fontSize: "14px" }}
              >
                Expiry Date :{" "}
                <span className="poppins-medium">
                  {alluserdata.expiryDate}{" "}
                </span>
              </div>
            </>
          ) : (
            ""
          )}

          <hr />
        </div>

        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-6">
            <Link
              to="/black-box"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div
                className="poppins-regular"
                style={{
                  backgroundColor: "darkblue",
                  color: "white",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Black Box
              </div>
            </Link>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {data && Object.keys(data).length > 0 && (
          <div>
            <Link
              to="/asin-details"
              state={{ data, dailySales: dailySales }}
              style={{
                textDecoration: "none",
                color: "black",
                marginBottom: "120px",
              }}
            >
              <div className="row mt-3 mb-5" key={data.asin}>
                <div className="col-2">
                  <img
                    src={data.product_photo}
                    alt={data.product_title}
                    style={{ width: "100%", height: "100px" }}
                  />
                </div>
                <div
                  className="col-10 d-flex"
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      color: "grey",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {data.product_title}
                  </div>
                  <div className="poppins-medium">
                    {data.country === "US"
                      ? `$${data.product_price}`
                      : `Rs. ${data.product_price}`}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {data.length === 0 && (
          <img
            src="./images/homestep.jpg"
            alt="loading..."
            className="mt-3"
            // style={{ width: "100%", height: "100px" }}
            style={{ marginBottom: "120px" }}
          />
        )}

        {/* <div className="">
          <i className="fa-brands fa-rocketchat chat_icon"></i>
        </div> */}

        {/* <Link to="/chat" className="chat-button-container">
          <i className="fa-brands fa-rocketchat chat-icon"></i>
        </Link> */}

        {/* Payment Modal */}
        <Modal
          centered
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          dialogClassName="custom-modal"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title className="custom-title">Subscription</Modal.Title>
          </Modal.Header> */}
          <Modal.Body className="custom-body">
            <div className="modal-content-wrapper">
              <div className="plan basic-plan">
                <div className="plan-icon">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Basic Plan Icon"
                  />
                </div>
                <div className="plan-details">
                  <h3 className="plan-title">Basic</h3>
                  <p className="plan-description">
                    Buy this plan and get 500 searches free for a month
                  </p>
                  <h4 className="plan-price">₹1997/month</h4>
                  <Button
                    variant="primary"
                    className="custom-proceed-button"
                    onClick={handlePayment1}
                  >
                    Buy Plan
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Asin;
