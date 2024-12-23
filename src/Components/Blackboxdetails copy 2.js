import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";

function Blackboxdetails() {
  const location = useLocation();
  const filterData = location.state?.filterData; // Access passed data
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("filterData", filterData);

  const navigate = useNavigate();

  const [keydata, setkeydata] = useState([]);

  const [clickdata, setclickdata] = useState(null);

  // const handleSearch = async () => {
  //   if (!filterData || !filterData.keyword) {
  //     setError("Keyword is missing in the filter data.");
  //     return;
  //   }

  //   setError(""); // Reset error
  //   setLoading(true);

  //   try {
  //     // Perform the product search
  //     const response = await axios.get(
  //       "https://api.proleverageadmin.in/api/amazon/getitems2",
  //       {
  //         params: {
  //           query: filterData.selectedCategories.join(","), // Use the keyword from filterData
  //           userId: "67596d1d03c4ea704cbeb250", // Pass the user ID
  //           country: filterData.country, // Pass the country from filterData
  //           min_price: filterData.price.min,
  //           max_price: filterData.price.max,
  //           // sales_min_price : ,
  //           // sales_max_price : ,
  //         },
  //       }
  //     );

  //     const products = response.data.data.products || [];
  //     setData(products.slice(0, 10));
  //   } catch (err) {
  //     console.error("Error during search:", err);
  //     if (err.response?.status === 403) {
  //       const backendError =
  //         err.response?.data?.error || "An unexpected error occurred.";
  //       setError(backendError);
  //       window.location.assign("/Plans");
  //     } else {
  //       setError("Failed to fetch data. Please try again.");
  //     }
  //   }

  //   setLoading(false);
  // };

  const excludeKeywordsArray = filterData?.excludeKeywords
    ? filterData.excludeKeywords
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase())
    : [];

  // const handleSearch = async () => {
  //   // Validate that selectedCategories is not empty
  //   if (
  //     !filterData ||
  //     !filterData.selectedCategories ||
  //     filterData.selectedCategories.length === 0
  //   ) {
  //     setError("Please select at least one category.");
  //     return;
  //   }

  //   setError(""); // Reset error
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(
  //       "https://api.proleverageadmin.in/api/amazon/getitems2",
  //       {
  //         params: {
  //           query: filterData.selectedCategories.join(","), // Use selectedCategories
  //           userId: "67596d1d03c4ea704cbeb250",
  //           country: filterData.country,
  //           min_price: filterData.price.min,
  //           max_price: filterData.price.max,
  //         },
  //       }
  //     );

  //     const products = response.data.data.products || [];
  //     setData(products.slice(0, 10));
  //   } catch (err) {
  //     console.error("Error during search:", err);
  //     if (err.response?.status === 403) {
  //       const backendError =
  //         err.response?.data?.error || "An unexpected error occurred.";
  //       setError(backendError);
  //       window.location.assign("/Plans");
  //     } else {
  //       setError("Failed to fetch data. Please try again.");
  //     }
  //   }

  //   setLoading(false);
  // };

  const handleSearch = async () => {
    if (
      !filterData ||
      !filterData.selectedCategories ||
      filterData.selectedCategories.length === 0
    ) {
      setError("Please select at least one category.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const categoryLabels = filterData.selectedCategories
        .map((category) => category.label.replace(/\s+/g, "-"))
        .join(",");
      const categoryValues = filterData.selectedCategories
        .map((category) => category.value)
        .join(",");
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/amazon/getitems2",
        {
          params: {
            query: categoryLabels,
            userId: "67596d1d03c4ea704cbeb250",
            country: filterData.country,
            min_price: filterData.price.min,
            max_price: filterData.price.max,
            category_id: categoryValues,
          },
        }
      );

      const products = Array.isArray(response.data.data.products)
        ? response.data.data.products
        : [];

      const filteredProducts = products.filter((product) => {
        const title = product.product_title.toLowerCase();
        return !excludeKeywordsArray.some((keyword) => title.includes(keyword));
      });

      setData(filteredProducts.slice(0, 10));
    } catch (err) {
      console.error("Error during search:", err);
      if (err.response?.status === 403) {
        const backendError =
          err.response?.data?.error || "An unexpected error occurred.";
        setError(backendError);
        window.location.assign("/Plans");
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const ProductLoader = () => (
    <ContentLoader
      speed={2}
      width="100%"
      height={100}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="10" rx="4" ry="4" width="80" height="80" />
      <rect x="100" y="10" rx="4" ry="4" width="70%" height="20" />
      <rect x="100" y="40" rx="4" ry="4" width="50%" height="15" />
      <rect x="100" y="65" rx="4" ry="4" width="30%" height="15" />
    </ContentLoader>
  );

  console.log("data", data);
  console.log("filterData", filterData);

  useEffect(() => {
    getKeywordData();
  }, []);

  const getKeywordData = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/getallasin"
      );
      if (response.status === 200) {
        setkeydata(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching keyword data:", error);
    }
  };

  const addkeyworddata = async (asinData) => {
    try {
      const config = {
        url: "/addasin",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "Content-Type": "application/json" },
        data: asinData,
      };

      const response = await axios(config);
      if (response.status === 200) {
        console.log("Successfully added ASIN data.");
      }
    } catch (error) {
      console.error("Error adding ASIN data:", error);
    }
  };

  const handleItemClick = (item) => {
    setclickdata(item);
    setTimeout(() => {
      const matchingData = keydata.find(
        (keyItem) => keyItem.asin === item?.asin
      );

      if (matchingData) {
        console.log("ASIN already exists in keydata:", matchingData);
      } else {
        console.log("ASIN not found in keydata. Fetching new data...");
        handleSearch1(item?.asin);
      }

      navigate("/product-details", { state: { data: item } });
    }, 100);
  };

  const handleSearch1 = async (asin) => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/amazon/affiliatekeyword1",
        {
          params: {
            asin,
            country: filterData?.country || "IN",
            userId: "67596d1d03c4ea704cbeb250",
          },
        }
      );

      if (response.data.data && Object.keys(response.data.data).length > 0) {
        const updatedData = response.data.data;

        setkeydata((prevKeyData) =>
          prevKeyData.map((item) =>
            item.asin === asin
              ? { ...item, category: updatedData.category.name }
              : item
          )
        );

        if (!keydata.some((item) => item.asin === updatedData.asin)) {
          addkeyworddata({
            userId: "67596d1d03c4ea704cbeb250",
            category: updatedData.category?.name || "",
            asin: updatedData.asin || "",
          });
        }
      } else {
        setError("ASIN code is incorrect or no data available.");
      }
    } catch (err) {
      console.error("Error fetching data for ASIN:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="row mt-3 mb-3" style={{ justifyContent: "center" }}>
        <div className="col-md-8">
          {loading ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <ProductLoader key={index} />
              ))}
            </div>
          ) : (
            <div>
              {data.length > 0 ? (
                <ul>
                  {data.map((item, index) => (
                    <Link
                      key={item.asin}
                      state={{ data: item }}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={(e) => {
                        // setclickdata(item);
                        e.preventDefault(); // Prevent immediate navigation
                        handleItemClick(item);
                      }}
                    >
                      <div className="row mt-3">
                        <div className="col-2">
                          <div
                            className="d-flex"
                            style={{ justifyContent: "center" }}
                          >
                            <img
                              src={item.product_photo}
                              alt={item.product_title}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
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
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.product_title}
                          </div>
                          <div
                            className="poppins-regular"
                            style={{
                              color: "grey",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.asin}
                          </div>

                          <div className="poppins-medium">
                            Price :{" "}
                            {filterData.country === "USD"
                              ? `$${item.product_price}`
                              : `${item.product_price}`}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div>No data found</div>
              )}
            </div>
          )}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Blackboxdetails;
