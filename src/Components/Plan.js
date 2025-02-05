import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Modal, Form } from "react-bootstrap";

const Plan = () => {
  const [plandata, setPlandata] = useState([]);
  const [userData, setUserData] = useState(null);

  const [paymentKeys, setPaymentKeys] = useState({
    reazorpaykey_id: "",
    reazorpaykey_secret: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [selectdata, setselectdata] = useState(null);
  const [allcoupondata, setallcoupondata] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(selectdata?.price);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [usedCoupons, setUsedCoupons] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleselectdata = (data) => {
    setselectdata(data);
    handleShow();
  };

  console.log("selectdata", selectdata);

  useEffect(() => {
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.proleverageadmin.in/api/users/getUserDetails/${userData?._id}`
        );

        if (response.status === 200) {
          setUsedCoupons(response.data.usedCoupons || []);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userData?._id) {
      fetchUserData();
    }
  }, [userData]);

  console.log("usedCoupons", usedCoupons);

  console.log("userData", userData);

  // Fetch Razorpay Keys
  const fetchPaymentKeys = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/paymentkey/getAllreazorpaypayment"
      );
      if (response.status === 200) {
        setPaymentKeys({
          reazorpaykey_id: response.data.reazorpaykey_id,
          reazorpaykey_secret: response.data.reazorpaykey_secret,
        });
      }
    } catch (error) {
      console.error("Error fetching payment keys:", error);
    }
  };

  console.log("paymentKeys", paymentKeys);

  useEffect(() => {
    fetchPaymentKeys();
    getAllPlans();
    getAllcoupondata();
  }, []);

  // Fetch Plans
  const getAllPlans = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/plans/getallplan"
      );
      setPlandata(response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const getAllcoupondata = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/getAllplanCoupon"
      );
      setallcoupondata(response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  console.log("allcoupondata", allcoupondata);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded successfully.");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script.");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment1 = async (planId, price) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "https://api.proleverageadmin.in/api/payment/orders",
        { amount: price, userId: userData?._id, planId: planId }
      );

      const options = {
        key: paymentKeys.reazorpaykey_id, // Dynamic Razorpay key
        amount: price * 100,
        currency: "INR",
        order_id: orderResponse.data.orderId,
        name: "Subscription Plan",
        description: "Plan Activation",
        handler: async (response) => {
          try {
            const verifyResponse = await axios.get(
              `https://api.proleverageadmin.in/api/payment/payment/${response.razorpay_payment_id}`,
              {
                params: {
                  userId: userData?._id,
                  planId,
                  couponCode: searchvalue,
                },
              }
            );
            if (verifyResponse.status === 200) {
              alert("Payment Successful!");
              window.location.assign("/payment-success");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: userData?.name || "Customer",
          email: userData?.email || "customer@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  // const applyCoupon = () => {
  //   const foundCoupon = allcoupondata.find(
  //     (coupon) => coupon.couponCode === searchvalue
  //   );

  //   if (foundCoupon) {
  //     const discountAmount = (selectdata?.price * foundCoupon.discount) / 100;
  //     const finalPrice = selectdata?.price - discountAmount;

  //     setDiscountedPrice(finalPrice.toFixed(2));
  //     setErrorMessage("");
  //   } else {
  //     setErrorMessage("❌ Invalid Coupon Code");
  //     setDiscountedPrice(selectdata?.price);
  //   }
  // };

  const applyCoupon = () => {
    // Check if user has already used this coupon
    if (usedCoupons.includes(searchvalue)) {
      setErrorMessage("❌ Coupon Code Already Used");
      setDiscountedPrice(selectdata?.price); // Reset price
      return;
    }

    // Find if the coupon exists in available coupons
    const foundCoupon = allcoupondata.find(
      (coupon) => coupon.couponCode === searchvalue
    );

    if (foundCoupon) {
      const discountAmount = (selectdata?.price * foundCoupon.discount) / 100;
      const finalPrice = selectdata?.price - discountAmount;

      setDiscountedPrice(finalPrice.toFixed(2));
      setErrorMessage(""); // Clear error message
    } else {
      setErrorMessage("❌ Invalid Coupon Code");
      setDiscountedPrice(selectdata?.price);
    }
  };

  return (
    <div className="pricingSection">
      {plandata.map((plan, index) => (
        <div className="card" key={index}>
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <img
              src={plan.imagelink}
              alt="loading...."
              style={{ width: "80px", height: "80px" }}
            />
          </div>
          <h3 className="title poppins-regular">{plan.planName}</h3>
          <h4 className="price poppins-semibold">₹ {plan.price}</h4>
          <p className="searches poppins-regular">
            {plan.searchCount} Searches
          </p>

          <p className="searches poppins-regular" style={{ color: "green" }}>
            {plan.priceDescription}
          </p>
          <button
            className="button poppins-medium"
            // onClick={() => handlePayment1(plan._id, plan.price)}
            onClick={() => handleselectdata(plan)}
          >
            Buy Now
          </button>
        </div>
      ))}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        {/* Header */}
        <Modal.Header>
          <Modal.Title className="poppins-medium" style={{ fontSize: "18px" }}>
            Plan Details
          </Modal.Title>
        </Modal.Header>

        {/* Body */}
        <Modal.Body>
          <div className="d-flex align-items-center apply-coupon">
            <Form.Control
              type="text"
              placeholder="Enter Coupon Code"
              className="coupon-input"
              value={searchvalue}
              onChange={(e) => setsearchvalue(e.target.value)}
            />
            <Button
              onClick={applyCoupon}
              variant="outline-primary"
              className="apply-btn poppins-regular "
            >
              Apply
            </Button>
          </div>
          {errorMessage && (
            <p className="text-danger mt-2 poppins-regular text-center">
              {errorMessage}
            </p>
          )}
          <div
            className="poppins-semibold mt-3"
            style={{ color: "green", fontSize: "16px" }}
          >
            Billing Detais
          </div>
          <div className="plan-details mt-2">
            <p className="poppins-regular">
              <strong>Plan Name:</strong> {selectdata?.planName}
            </p>
            <p className="poppins-regular">
              <strong>Valid Period:</strong> {selectdata?.validPeriod} days
            </p>
            <p className="poppins-regular">
              <strong>Search Count:</strong> {selectdata?.searchCount}
            </p>
            <p className="poppins-regular">
              <strong>Original Price:</strong> ₹{selectdata?.price}
            </p>
            <p className="poppins-regular">
              <strong>Final Price After Discount:</strong> ₹
              {discountedPrice > 0 ? discountedPrice : selectdata?.price}
            </p>
          </div>

          {/* Coupon Input & Apply Button */}
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="buy-now-btn"
            // onClick={() => handlePayment1(selectdata?._id, selectdata?.price)}
            onClick={() =>
              handlePayment1(
                selectdata?._id,
                discountedPrice > 0 ? discountedPrice : selectdata?.price
              )
            }
          >
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Plan;
