import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Blackbox() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("IN");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [reviewCount, setReviewCount] = useState({ min: "", max: "" });
  const [excludeKeywords, setExcludeKeywords] = useState("");
  const [keyword, setkeyword] = useState("");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [sales, setSales] = useState({ min: "", max: "" });
  const [alluserdata, setalluserdata] = useState("");
  const [categories, setCategories] = useState([]);

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    // Fetch the user data from localStorage
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserdata(parsedUser); // Update state with user data
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  console.log("userData", userData);

  useEffect(() => {
    if (userData?._id) {
      getuser();
    }
  }, [userData]);

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

  console.log("alluserdata", alluserdata);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleApplyFilters = () => {
    if (!price) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (alluserdata.searchcount >= alluserdata.searchLimit) {
      window.location.assign("/Plans");
      return;
    }

    const filterData = {
      country,
      selectedCategories: selectedCategories.map((category) => ({
        value: category.value,
        label: category.label,
      })),
      reviewCount,
      excludeKeywords,
      price,
      sales,
    };

    console.log("Filter Data:", filterData);

    navigate("/black-box-details", { state: { filterData } });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.proleverageadmin.in/api/amazon/categories",
          {
            params: { country },
          }
        );
        // setCategories(response.data.data);
        const formattedCategories = response.data.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        console.log("Formatted categories:", formattedCategories);
        setCategories(formattedCategories);
      } catch (err) {
        alert("Failed to fetch categories.");
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [country]);

  console.log("categories", categories);

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container mt-3">
      <i
        onClick={handleGoBack}
        className="fa-solid fa-less-than mb-3"
        style={{
          backgroundColor: "blue",
          padding: "8px 10px",
          color: "white",
          borderRadius: "50px",
          fontSize: "15px",
          textAlign: "center",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      ></i>

      <div
        className="row mt-1 mb-3 web-tools"
        style={{ justifyContent: "center" }}
      >
        <div className="col-md-2">
          <Link to="/asin-code" style={{ textDecoration: "none" }}>
            <div
              className="poppins-regular"
              style={{
                border: "1px solid darkblue",
                color: "black",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              ASIN/Product
            </div>
          </Link>
        </div>

        <div className="col-md-2">
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

        <div className="col-md-2">
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
            Blackbox
          </div>
        </div>
      </div>

      <div className="mobile-tools">
        <div className="d-flex " style={{ justifyContent: "space-between" }}>
          <div className="col-6">
            <Link to="/asin-code" style={{ textDecoration: "none" }}>
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
                ASIN/Product
              </div>
            </Link>
          </div>

          <div className="col-6 px-3">
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
      </div>

      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <label className="form-label">Marketplace</label>
          <div className="custom-select-container" style={{ width: "100%" }}>
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
        <div className="col-md-6 mb-3">
          <label className="form-label">Categories & Subcategories</label>
          <Select
            options={categories}
            isMulti
            onChange={handleCategoryChange}
            className="basic-multi-select poppins-regular"
            classNamePrefix="select"
            placeholder="Select categories"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Review Count (Min & Max)</label>
          <div className="d-flex gap-3">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={reviewCount.min}
              onChange={(e) =>
                setReviewCount({ ...reviewCount, min: e.target.value })
              }
            />
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={reviewCount.max}
              onChange={(e) =>
                setReviewCount({ ...reviewCount, max: e.target.value })
              }
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Exclude Title Keywords</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter keywords to exclude"
            value={excludeKeywords}
            onChange={(e) => setExcludeKeywords(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Price (Min & Max)</label>
          <div className="d-flex gap-3">
            <input
              type="number"
              className="form-control"
              placeholder={`Min ${
                country === "IN" ? "₹" : country === "US" ? "$" : ""
              }`}
              value={price.min}
              onChange={(e) => setPrice({ ...price, min: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder={`Max ${
                country === "IN" ? "₹" : country === "US" ? "$" : ""
              }`}
              value={price.max}
              onChange={(e) => setPrice({ ...price, max: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Sales (Min & Max)</label>
          <div className="d-flex gap-3">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={sales.min}
              onChange={(e) => setSales({ ...sales, min: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={sales.max}
              onChange={(e) => setSales({ ...sales, max: e.target.value })}
            />
          </div>
        </div>
        <div className="col-12 text-center mt-4 mb-4">
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <div
              className="poppins-medium w-50 "
              style={{
                borderRadius: "5px",
                backgroundColor: "blue",
                color: "white",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-tools">
        <Link to="/chat" className="chat-button-container">
          <i className="fa-brands fa-rocketchat chat-icon"></i>
        </Link>
      </div>
    </div>
  );
}

export default Blackbox;
