import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Blogs from "./Components/Blogs";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Login from "./Components/Login";
import Header from "./Components/Header";
// import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Coursesdetails from "./Components/Coursesdetails";
import Content from "./Components/Content";
import Asin from "./Components/Asin";
import Product from "./Components/Product";
import Asindetails from "./Components/Asindetails";
import Productdetails from "./Components/Productdetails";
import Header1 from "./Components/Header1";
import Plan from "./Components/Plan";
import Blackbox from "./Components/Blackbox";
import Blackboxdetails from "./Components/Blackboxdetails";
import PaymentSuccess from "./Components/Paymentsucess";
import Chat from "./Components/Chat";
import Notification from "./Components/Notification";
import Flas from "./Components/Flas";
import Buysignup from "./Components/Buysignup";
import Buylogin from "./Components/Buylogin";
import Privacy from "./Components/Privacy";
import Terms from "./Components/Terms";
import Refund from "./Components/Refund";
import Phonepe from "./Components/Phonepe";
import Mobilefooter from "./Components/Mobilefooter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Header1 />
              <Home />
              <Mobilefooter />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <Header1 />
              <About />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <Header />
              <Header1 />
              <Blogs />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <>
              <Header />
              <Header1 />
              <Courses />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/tools"
          element={
            <>
              <Header />
              <Header1 />
              <Tools />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="/coursesdetail"
          element={
            <>
              <Header />
              <Header1 />
              <Coursesdetails />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/content/:id"
          element={
            <>
              <Header />
              <Header1 />
              <Content />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/asin-code"
          element={
            <>
              <Header />
              <Header1 />
              <Asin />
              <Mobilefooter />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/product-search"
          element={
            <>
              <Header />
              <Header1 />
              <Product />
              <Mobilefooter />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/asin-details"
          element={
            <>
              <Header />
              <Header1 />
              <Asindetails />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/product-details"
          element={
            <>
              <Header />
              <Header1 />
              <Productdetails />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/Plans"
          element={
            <>
              <Header />
              <Header1 />
              <Plan />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/black-box"
          element={
            <>
              <Header />
              <Header1 />
              <Blackbox />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/black-box-details"
          element={
            <>
              <Header />
              <Header1 />
              <Blackboxdetails />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/payment-success"
          element={
            <>
              {/* <Header />
              <Header1 /> */}
              <PaymentSuccess />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/chat"
          element={
            <>
              <Header />
              <Header1 />
              <Chat />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/notification"
          element={
            <>
              <Header />
              <Header1 />
              <Notification />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Flas />
            </>
          }
        />
        <Route
          path="/Sign-up"
          element={
            <>
              <Buysignup />
            </>
          }
        />
        <Route
          path="/Sign-in"
          element={
            <>
              <Buylogin />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <Header1 />
              <Privacy />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/termsofuse"
          element={
            <>
              <Header />
              <Header1 />
              <Terms />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/refund-policy"
          element={
            <>
              <Header />
              <Header1 />
              <Refund />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/phone"
          element={
            <>
              <Header />
              <Header1 />
              <Phonepe />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
