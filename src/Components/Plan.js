import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const [plandata, setPlandata] = useState([]);
  const [userData, setUserData] = useState(null);
  const [paymentKeys, setPaymentKeys] = useState({
    reazorpaykey_id: "",
    reazorpaykey_secret: "",
  });
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

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
      navigate("/");
    }
  }, [navigate]);

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

  // Load Razorpay Script
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

  // const createOrder = async (price) => {
  //   try {
  //     const response = await axios.post(
  //       "https://api.proleverageadmin.in/api/payment/orders",
  //       {
  //         amount: price,
  //         currency: "INR",
  //         userId: "676ceb42a70e449880e33c34",
  //       }
  //     );
  //     setOrderId(response.data.orderId);
  //     return response.data.orderId;
  //   } catch (error) {
  //     console.error("Error creating Razorpay order:", error);
  //     alert("Failed to create order. Please try again.");
  //     return null;
  //   }
  // };

  // Handle Payment
  const handlePayment1 = async (planId, price) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "https://api.proleverageadmin.in/api/payment/orders",
        { amount: price, userId: userData?._id }
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
              { params: { userId: userData?._id, planId } }
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
