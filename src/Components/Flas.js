import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

function Flas() {
  const [testi, settesti] = useState([]);
  const servicesSectionRef = useRef(null);
  useEffect(() => {
    const handleResize2 = () => {
      if (window.innerWidth <= 768) {
        settesti(1);
      } else {
        settesti(3);
      }
    };

    handleResize2();

    window.addEventListener("resize", handleResize2);

    return () => window.removeEventListener("resize", handleResize2);
  }, []);
  const getEmbedUrl = (videoUrl) => {
    if (videoUrl.includes("youtube.com/shorts")) {
      const videoId = videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/watch")) {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtu.be")) {
      const videoId = videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoUrl;
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Why ProLeverage?",
      content:
        "Unlike other product research tools, this simplifies the process by reducing product research and analysis into 3 simple steps, focusing on the data that actually matters!",
    },
    {
      title: "What all data does ProLeverage give?",
      content:
        "Sales per month of the product, keyword search volume, and profit of the product.",
    },
    {
      title: "How accurate is ProLeverage?",
      content:
        "ProLeverage estimates 36.7% of product sales perfectly correct (with 0 errors), but provides an estimation within 22 units above or below actual sales.",
    },
    {
      title:
        "Why Do I Need a Product Research Tool to Start My Ecommerce Business?",
      content:
        "Having a product research tool like ProLeverage helps you avoid the trial-and-error process by giving you competitor data, which helps you make better decisions in product selection.",
    },
    {
      title: "How Can I Get ProLeverage?",
      content:
        "You can get the ProLeverage product research tool by clicking on the signup button on the top-right corner and trying it out for free for limited searches.",
    },
  ];

  const testimonialdata = [
    {
      videolink: "https://youtu.be/1TQZCAcWguI",
    },
    {
      videolink: "https://youtu.be/7RNwOLuNkiU",
    },
    {
      videolink: "https://youtu.be/80Qb0jW5rB0",
    },
    {
      videolink: "https://youtu.be/vplILXwMHYY",
    },
    {
      videolink: "https://youtu.be/vuKmtk_qGOI",
    },
    {
      videolink: "https://youtu.be/TyvimL46nVc",
    },
  ];

  const scrollToServices = () => {
    if (servicesSectionRef.current) {
      servicesSectionRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the start of the section
      });
    }
  };
  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <div className="container">
        <div className="row">
          <div className="row mt-4">
            <div className="col-md-6">
              <div
                className="d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <img
                  src="../images/plogo.png"
                  style={{ width: "60%" }}
                  alt="loading"
                />
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div
                className="poppins-regular"
                style={{ color: "#F6E282", fontSize: "16px" }}
              >
                Experience the new & efficient way to <br /> do your product
                research!
              </div>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <div
                  className="poppins-semibold mt-3"
                  style={{
                    backgroundColor: "#121291",
                    color: "#FFB15F",
                    width: "50%",
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  Get Started For Free
                </div>
              </Link>
            </div>
          </div>

          <div className="d-flex" style={{ justifyContent: "center" }}>
            <iframe
              src="https://www.youtube.com/embed/trHAfEmquBo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "10px",
                marginTop: "50px",
                width: "80%",
                height: "450px",
              }}
            ></iframe>
          </div>

          <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="50"
              height="50"
              style={{ marginTop: "23px" }}
            >
              <circle
                cx="100"
                cy="50"
                r="45"
                fill="none"
                stroke="#f5a463"
                stroke-width="5"
              />

              <circle
                cx="65"
                cy="125"
                r="45"
                fill="none"
                stroke="#f5a463"
                stroke-width="5"
              />

              <circle
                cx="135"
                cy="125"
                r="45"
                fill="none"
                stroke="#f5a463"
                stroke-width="5"
              />
            </svg>
            <div
              className="poppins-bold text-center mt-4 pt-1 mx-4"
              style={{
                color: "#FFB15F",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Analyze Products In 3 Steps
            </div>
          </div>

          <div className="row mt-4" style={{ justifyContent: "center" }}>
            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Step 1
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>

              <div
                className="poppins-regular mt-3 text-center"
                style={{ color: "#F6E282", fontSize: "14px" }}
              >
                Copy ASIN Of The Product You Want To Analyze From Amazon
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Step 2
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin1.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>
              <div
                className="poppins-regular mt-3 text-center"
                style={{ color: "#F6E282", fontSize: "14px" }}
              >
                Paste ASIN On Search Bar In ProLeverage App
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Step 3
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin2.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>
              <div
                className="poppins-regular mt-3 text-center"
                style={{ color: "#F6E282", fontSize: "14px" }}
              >
                Get Data From ProLeverage Such As Sales & Revenue Estimation,
                Profit Calculation, Keyword Search Volume...
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-3">
              <div
                className=""
                style={{
                  border: "2px solid #F6E282",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <img
                    src="../images/youtube.webp"
                    alt="loading..."
                    style={{ width: "90px", height: "60px" }}
                  />
                </div>

                <div
                  className="poppins-regular-italic text-center pt-1"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  42,601+
                </div>
                <div
                  className="poppins-semibold text-center pt-2"
                  style={{ color: "white" }}
                >
                  subscribers
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className=""
                style={{
                  border: "2px solid #F6E282",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <img
                    src="../images/insta.webp"
                    alt="loading..."
                    style={{ width: "90px", height: "60px" }}
                  />
                </div>

                <div
                  className="poppins-regular-italic text-center pt-1"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  7,833+
                </div>
                <div
                  className="poppins-semibold text-center pt-2"
                  style={{ color: "white" }}
                >
                  followers
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className=""
                style={{
                  border: "2px solid #F6E282",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <img
                    src="../images/web.webp"
                    alt="loading..."
                    style={{ width: "90px", height: "60px" }}
                  />
                </div>

                <div
                  className="poppins-regular-italic text-center pt-1"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  22,731+
                </div>
                <div
                  className="poppins-semibold text-center pt-2"
                  style={{ color: "white" }}
                >
                  broadcasts
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className=""
                style={{
                  border: "2px solid #F6E282",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="39 39.002 122 121.996"
                    viewBox="39 39.002 122 121.996"
                    width="90"
                    height="60"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <g>
                      <path
                        d="M161 100c0 33.688-27.314 60.998-61.01 60.998C66.309 160.998 39 133.688 39 100c0-33.693 27.309-60.998 60.99-60.998C133.686 39.002 161 66.307 161 100z"
                        fill="#FFC76A"
                        data-color="1"
                      ></path>
                      <path
                        d="M161 100c0-2.367-.152-4.695-.413-6.988l-49.346-28.676c3.746 3.299 4.289 8.901 4.613 14.935.02 0 .418.938.438.938 1.16 0 1.458.753 1.458 3.521 0 2.775.428 4.553-.732 4.553-.381 0-2.718-.992-3.018-1.407-1.136 3.785-3.702 4.938-6.313 7.312-1.025 2.394-2.381 9.843-.812 12.5 0 0 10.375 2.681 10.375 13.875l-53.529 6.609 53.793 31.265C142.658 150.905 161 127.597 161 100z"
                        opacity=".1"
                      ></path>
                      <path
                        d="M109.776 106.276c-1.568-2.657-.578-6.182.448-8.576 2.61-2.374 4.643-5.641 5.779-9.427.3.416.641.654 1.022.654 1.16 0 2.092-2.249 2.092-5.024 0-2.768-.932-5.012-2.092-5.012-.02 0-.037.007-.056.007-.551-10.27-4.929-18.261-16.978-18.261-12.371 0-16.454 7.991-16.958 18.261-.024 0-.047-.007-.076-.007-1.151 0-2.092 2.244-2.092 5.012 0 2.775.941 5.024 2.092 5.024.376 0 .727-.243 1.037-.661 1.135 3.793 3.169 7.06 5.784 9.434 1.03 2.394 2.018 5.919.445 8.576 0 0-26.739 9.702-26.739 20.896h73.025c-.002-11.194-26.733-20.896-26.733-20.896z"
                        fill="#005473"
                        data-color="2"
                      ></path>
                    </g>
                  </svg>
                </div>

                <div
                  className="poppins-regular-italic text-center pt-2"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  3,244+
                </div>
                <div
                  className="poppins-semibold text-center pt-2"
                  style={{ color: "white" }}
                >
                  enrolled
                </div>
              </div>
            </div>
          </div>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
              <div
                className="poppins-semibold mt-3"
                style={{
                  backgroundColor: "#121291",
                  color: "#FFB15F",
                  width: "20%",
                  textAlign: "center",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                Get Started For Free
              </div>
            </div>
          </Link>

          <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="80"
              height="80"
            >
              <rect
                x="50"
                y="160"
                width="100"
                height="20"
                fill="#f5a463"
                transform="skewX(-10)"
              />

              <g fill="#f5a463" transform="rotate(-10,100,100)">
                <rect x="80" y="40" width="40" height="20" />
                <rect x="75" y="60" width="50" height="20" />
                <rect x="70" y="80" width="60" height="20" />
                <rect x="65" y="100" width="70" height="20" />
                <rect x="60" y="120" width="80" height="20" />
                <rect x="55" y="140" width="90" height="20" />

                <g fill="black">
                  <circle cx="90" cy="50" r="4" />
                  <circle cx="110" cy="50" r="4" />
                  <circle cx="95" cy="70" r="4" />
                  <circle cx="115" cy="70" r="4" />
                  <circle cx="85" cy="90" r="4" />
                  <circle cx="125" cy="90" r="4" />
                </g>
              </g>
            </svg>

            <div
              className="poppins-bold text-center mt-4 pt-1 mx-4"
              style={{
                color: "#FFB15F",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Data You Can Rely Upon!
            </div>
          </div>

          <div className="row mt-4" style={{ justifyContent: "center" }}>
            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Monthly Product Sales & Revenue
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin3.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Keyword Search Volume
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin4.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="poppins-bold"
                style={{
                  color: "#F6E282",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Profit Calculation
              </div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/asin5.avif"
                  alt="loading..."
                  className="mt-3"
                  style={{ width: "90%", borderRadius: "5px" }}
                />
              </div>
              <div
                className="poppins-regular mt-3 text-center"
                style={{ color: "#F6E282", fontSize: "14px" }}
              >
                *Product Shown Is An Example
              </div>
            </div>
          </div>

          <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="80"
              height="80"
            >
              <path
                d="M40 130 C30 150, 50 180, 70 160 L70 120 Z"
                fill="#f5a463"
              />
              <path
                d="M160 130 C170 150, 150 180, 130 160 L130 120 Z"
                fill="#f5a463"
              />

              <circle cx="100" cy="80" r="50" fill="#f5a463" />

              <path
                d="M80 60 Q90 50, 100 55 T120 65 Q110 80, 90 75 T80 60 Z"
                fill="navy"
              />
              <path d="M100 70 L110 90 Q100 100, 90 90 Z" fill="navy" />
              <path
                d="M85 90 Q90 110, 100 100 Q115 110, 120 90 Z"
                fill="navy"
              />
            </svg>

            <div
              className="poppins-bold text-center mt-4 pt-1 mx-4"
              style={{
                color: "#FFB15F",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Globalizing Product Research
            </div>
          </div>

          <div
            className="poppins-regular mt-3"
            style={{
              color: "#F6E282",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            This Tool Helps Not Only Helps Amazon Sellers But Also Drop-shippers
            Who Want To Sell Their Products Using Platforms Like Shopify,
            WooCommerce, WordPress Including Social Media Platforms Like
            Instagram & Facebook....
          </div>

          <div
            className="poppins-regular mt-3"
            style={{
              color: "#F6E282",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            So If You Are Doing Any Of These Business You Wont Get Data For Your
            Product To Analyze, But With ProLeverage You Can Get Those Important
            Data From Worlds Biggest Ecommerce Platform Amazon Which You Can
            Consider..
          </div>

          <div
            className="poppins-regular mt-3"
            style={{
              color: "#F6E282",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            For Ex; Suppose You Found A Product Which I Going Viral On Instagram
            But How Do You Decide Whether It Is Good To Sell?
          </div>

          <div
            className="poppins-regular mt-3"
            style={{
              color: "#F6E282",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Answer Is Simple You Search Same Product On Amazon Find Any Top
            Competitors Listing Copy ASIN Paste It On Proleverage You Get The
            Data Of That Product With Which You Can Make Decision Whether To
            Sell That Product Or Not!
          </div>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
              <div
                className="poppins-semibold mt-3"
                style={{
                  backgroundColor: "#121291",
                  color: "#FFB15F",
                  width: "20%",
                  textAlign: "center",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                Get Started For Free
              </div>
            </div>
          </Link>

          <div className="row mt-5">
            <div
              className="poppins-extrabold mb-5"
              style={{
                fontSize: "25px",
                textAlign: "center",
                color: "#FFB15F",
              }}
            >
              About Us
            </div>
            <div className="col-md-6">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="../images/r.webp"
                  alt="loading..."
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                className="poppins-medium  text-center pt-2"
                style={{
                  color: "#F6E282",
                  fontSize: "16px",
                  lineHeight: "30px",
                }}
              >
                Ronald C Mat
              </div>
              <div
                className="d-flex mt-3"
                style={{ justifyContent: "center", gap: "10px" }}
              >
                <img
                  src="../images/asin6.avif"
                  alt="loading..."
                  style={{ width: "75px", height: "75px" }}
                />
                <img
                  src="../images/asin7.avif"
                  alt="loading..."
                  style={{ width: "80px", height: "80px" }}
                />
                <img
                  src="../images/asin8.avif"
                  alt="loading..."
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="poppins-regular  text-center"
                style={{
                  color: "#F6E282",
                  fontSize: "16px",
                  lineHeight: "30px",
                }}
              >
                Hey, I'm Ronald
              </div>
              <div
                className="poppins-regular  text-center"
                style={{
                  color: "#F6E282",
                  fontSize: "16px",
                  lineHeight: "30px",
                }}
              >
                I am a Ecommerce Entrepreneur From Past 7 Years
              </div>

              <div
                className="poppins-regular  text-center mt-3"
                style={{
                  color: "#F6E282",
                  fontSize: "16px",
                  lineHeight: "30px",
                }}
              >
                I started my journey by selling products on amazon since 2017 &
                along the way i shared my experience & knowledge through my
                youtube channel Ecom Gyan(48k Subs), over the years launching
                multiple products & working with thousands of people i always
                wanted to simplify the products research, so that is why i hired
                few developers to create a software tool which helps new sellers
                to analyze products in much faster & efficient way,
              </div>
            </div>
          </div>

          <div
            className="poppins-extrabold mb-5 mt-5"
            style={{
              fontSize: "25px",
              textAlign: "center",
              color: "#FFB15F",
            }}
          >
            Pricing
          </div>

          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-md-3 mx-3">
              <div className="card pricing-card text-center shadow-lg">
                <div className="card-body">
                  <div className="icon mb-3">
                    <i
                      className="bi bi-calendar2-week"
                      style={{ fontSize: "2rem", color: "#f5a463" }}
                    ></i>
                  </div>
                  <h5 className="poppins-medium" style={{ fontSize: "18px" }}>
                    monthly plan
                  </h5>
                  <h2
                    className="poppins-medium text-warning mt-4"
                    style={{ color: "#FFB15F", fontSize: "25px" }}
                  >
                    ₹1,997
                  </h2>
                  <p className="poppins-regular" style={{ fontSize: "16px" }}>
                    searches
                  </p>
                  <p className="poppins-medium text-warning ">500/month</p>
                  <Link to="/Sign-up" style={{ textDecoration: "none" }}>
                    <button
                      className="mt-3 poppins-medium"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#FFB15F",
                        color: "black",
                        padding: "5px 20px",
                      }}
                    >
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 6 Months Plan */}
            <div className="col-md-3 mx-3">
              <div className="card pricing-card text-center shadow-lg">
                <div className="card-body">
                  <div className="icon mb-3">
                    <i
                      className="bi bi-calendar2-week"
                      style={{ fontSize: "2rem", color: "#f5a463" }}
                    ></i>
                  </div>
                  <h5 className="poppins-medium" style={{ fontSize: "18px" }}>
                    6months plan
                  </h5>
                  <h2
                    className="poppins-medium text-warning mt-4"
                    style={{ color: "#FFB15F", fontSize: "25px" }}
                  >
                    ₹10,997
                  </h2>
                  <div className="poppins-regular" style={{ color: "green" }}>
                    (save 10%)
                  </div>
                  <p
                    className="poppins-regular mt-3"
                    style={{ fontSize: "16px" }}
                  >
                    searches
                  </p>
                  <p className="poppins-medium text-warning "> 3,300/6months</p>
                  <div className="poppins-regular" style={{ color: "green" }}>
                    (300 extra)
                  </div>
                  <Link to="/Sign-up" style={{ textDecoration: "none" }}>
                    <button
                      className="mt-3 poppins-medium"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#FFB15F",
                        color: "black",
                        padding: "5px 20px",
                      }}
                    >
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="col-md-3 mx-3">
              <div className="card pricing-card text-center shadow-lg">
                <div className="card-body">
                  <div className="icon mb-3">
                    <i
                      className="bi bi-calendar2-week"
                      style={{ fontSize: "2rem", color: "#f5a463" }}
                    ></i>
                  </div>
                  <h5 className="poppins-medium" style={{ fontSize: "18px" }}>
                    yearly plan
                  </h5>
                  <h2
                    className="poppins-medium text-warning mt-4"
                    style={{ color: "#FFB15F", fontSize: "25px" }}
                  >
                    ₹20,997
                  </h2>
                  <div className="poppins-regular" style={{ color: "green" }}>
                    (save 24%)
                  </div>
                  <p
                    className="poppins-regular mt-3"
                    style={{ fontSize: "16px" }}
                  >
                    searches
                  </p>
                  <p className="poppins-medium text-warning "> 6,500/year</p>
                  <div className="poppins-regular" style={{ color: "green" }}>
                    (500 extra)
                  </div>
                  <Link to="/Sign-up" style={{ textDecoration: "none" }}>
                    <button
                      className="mt-3 poppins-medium"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#FFB15F",
                        color: "black",
                        padding: "5px 20px",
                      }}
                    >
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <div
              className="row"
              style={{
                backgroundColor: "rgb(236 226 176)",
                padding: "45px",
                justifyContent: "center",
              }}
            >
              <div
                className="poppins-extrabold-italic text-center mt-5"
                style={{ color: "black" }}
              >
                Testimonials
              </div>

              <div className="mt-4">
                <Swiper
                  slidesPerView={testi}
                  spaceBetween={40}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
                  className="mySwiper"
                >
                  <div className="col-md-4">
                    {testimonialdata.map((testimonial) => (
                      <SwiperSlide
                        key={testimonial._id}
                        style={{
                          // height: "500px",
                          // width: "500px",
                          backgroundColor: "white",
                          padding: "0px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        {testimonial.videolink && (
                          <iframe
                            width="100%"
                            height="200"
                            src={getEmbedUrl(testimonial.videolink)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex mt-4"
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className="poppins-semibold mt-3"
                    style={{
                      backgroundColor: "#121291",
                      color: "#FFB15F",
                      width: "20%",
                      textAlign: "center",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  >
                    Get Started For Free
                  </div>
                </div>
              </Link>

              <div className="poppins-medium text-center mt-4">
                For Any Queries
              </div>
              <div className="poppins-medium text-center mt-2">
                Contact Us support@proleverage.io
              </div>
            </div>
          </div>

          <div
            className="poppins-extrabold mb-5 mt-5"
            style={{
              fontSize: "25px",
              textAlign: "center",
              color: "#FFB15F",
            }}
          >
            F.A.Q's
          </div>

          <div className="accordion">
            {accordionData.map((item, index) => (
              <div key={index} className="accordion-item">
                <div
                  className={`accordion-header ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="poppins-medium" style={{ color: "#FFB15F" }}>
                    {item.title}
                  </span>
                  <span className="icon" style={{ fontSize: "25px" }}>
                    {activeIndex === index ? "▲" : "▼"}
                  </span>
                </div>
                <div
                  className={`accordion-body poppins-regular ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Flas;
