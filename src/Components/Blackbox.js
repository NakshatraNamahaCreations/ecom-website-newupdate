import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
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

  const userdata = localStorage.getItem("user");

  console.log("userdata", userdata);

  useEffect(() => {
    getuser();
  }, [alluserdata]);

  const getuser = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in//api/users/getparticularuser/${userdata?._id}`
      );
      if (response.status === 200) {
        setalluserdata(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching keyword data:", error);
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

  return (
    <div className="container mt-5">
      <div className="row">
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
              placeholder="Min"
              value={price.min}
              onChange={(e) => setPrice({ ...price, min: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Max"
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
    </div>
  );
}

export default Blackbox;
