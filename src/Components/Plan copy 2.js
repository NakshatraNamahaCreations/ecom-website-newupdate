import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [plandata, setplandata] = useState([]);

  const [userData, setUserdata] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserdata(parsedUser); // Set the user data if available
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
      navigate("/"); // Redirect to the login page if userData is not found
    }
  }, [navigate]);

  console.log("userData", userData);

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

  const createOrder = async (price) => {
    try {
      const response = await axios.post(
        "https://api.proleverageadmin.in/api/payment/orders",
        {
          amount: price,
          currency: "INR",
          userId: userData?._id,
        }
      );
      setOrderId(response.data.orderId);
      return response.data.orderId;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Failed to create order. Please try again.");
      return null;
    }
  };

  const handlePayment1 = async (planId, price) => {
    console.log("amount", planId, price);
    const isRazorpayLoaded = await loadRazorpayScript();

    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    const orderId = await createOrder(price);
    // if (!orderId) return;

    if (!orderId) {
      alert("Failed to create Razorpay order.");
      return;
    }

    console.log("Generated Order ID:", orderId);

    const options = {
      key: "rzp_live_gZWb9zLxROzkYB", // Razorpay Key
      amount: price * 100, // Convert to paise
      currency: "INR",
      name: "Proleverage",
      description: "Plan Subscription",
      order_id: orderId,

      handler: async (response) => {
        try {
          const verificationResponse = await axios.get(
            `https://api.proleverageadmin.in/api/payment/payment/${response.razorpay_payment_id}`,
            {
              params: { userId: userData?._id, planId },
            }
          );

          if (verificationResponse.status === 200) {
            alert("Payment verified and plan activated successfully!");
            window.location.assign("/payment-success");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: userData?.name || "Customer",
        email: userData?.email || "customer@example.com",
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    getallplan();
  }, []);

  const getallplan = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/plans/getallplan"
      );
      if (response.status === 200) {
        setplandata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("plandata", plandata);

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

          <button
            className="button poppins-medium"
            onClick={() => handlePayment1(plan._id, plan.price)}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Plan;
