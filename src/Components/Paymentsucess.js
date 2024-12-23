import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="checkmark-icon">✔️</div>
        <h1 className="poppins-regular">Payment Successful!</h1>
        <p className="poppins-regular">
          Thank you for your purchase. Your Plan has been placed successfully!
        </p>
      </div>

      <Link to="/asin-code" style={{ textDecoration: "none" }}>
        <div
          className="poppins-medium"
          style={{
            backgroundColor: "blue",
            padding: "5px 25px",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Visit Website
        </div>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
