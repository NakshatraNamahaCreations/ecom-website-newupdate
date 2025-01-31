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
      navigate("/login");
    }
  }, [navigate]);

  console.log("userData", userData);

  // Fetch Razorpay Keys
  const fetchPaymentKeys = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/paymentkey/getAllreazorpaypayment"
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
        "http://localhost:8082/api/plans/getallplan"
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

  const handlePayment1 = async (planId, price) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "http://localhost:8082/api/payment/orders",
        { amount: price, userId: "679b03823b746307884d70ba", planId: planId }
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
              `http://localhost:8082/api/payment/payment/${response.razorpay_payment_id}`,
              { params: { userId: "679b03823b746307884d70ba", planId } }
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

  // const handlePhonePePayment = async (planId, price) => {
  //   try {
  //     // Ensure user data exists
  //     if (!userData?._id) {
  //       alert("User not logged in. Please log in to continue.");
  //       return;
  //     }

  //     // Generate a unique transaction ID
  //     const transactionId = `TXN_${Date.now()}`;

  //     // Initiate payment request to backend
  //     const response = await axios.post(
  //       "https://api.proleverageadmin.in/api/payment/phonepe",
  //       {
  //         transactionId,
  //         MUID: userData._id,
  //         name: userData.name,
  //         amount: price,
  //         number: userData.phone || "9943740866", // Ensure phone number is available
  //       }
  //     );

  //     // Redirect user to PhonePe payment page
  //     if (response.data.success) {
  //       window.location.href = response.data.paymentUrl; // Redirects to PhonePe
  //     } else {
  //       alert("Payment initiation failed. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error initiating PhonePe payment:", error);
  //     alert("Failed to start payment.");
  //   }
  // };

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
