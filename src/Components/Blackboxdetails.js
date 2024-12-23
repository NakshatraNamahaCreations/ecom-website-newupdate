import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";

function Blackboxdetails() {
  const location = useLocation();
  const filterData = location.state?.filterData;
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [itemsToShow, setItemsToShow] = useState(10);

  const handleShowMore = () => {
    setItemsToShow((prev) => prev + 10);
  };

  console.log("filterData", filterData);

  const navigate = useNavigate();

  const [keydata, setkeydata] = useState([]);

  const [clickdata, setclickdata] = useState(null);

  const convertSalesVolume = (volume) => {
    if (!volume) return 0;

    const match = volume.match(/^([\d.]+)([a-zA-Z]*)/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2];

    const units = {
      K: 1_000,
      M: 1_000_000,
      B: 1_000_000_000,
    };

    return unit in units ? value * units[unit] : value;
  };

  const excludeKeywordsArray = filterData?.excludeKeywords
    ? filterData.excludeKeywords
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase())
    : [];

  // const handleSearch = async () => {
  //   if (
  //     !filterData ||
  //     !filterData.selectedCategories ||
  //     filterData.selectedCategories.length === 0
  //   ) {
  //     setError("Please select at least one category.");
  //     return;
  //   }
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const categoryLabels = filterData.selectedCategories
  //       .map((category) => category.label.replace(/\s+/g, "-"))
  //       .join(",");
  //     const categoryValues = filterData.selectedCategories
  //       .map((category) => category.value)
  //       .join(",");
  //     const response = await axios.get(
  //       "https://api.proleverageadmin.in/api/amazon/getitems2",
  //       {
  //         params: {
  //           query: categoryLabels,
  //           userId: "67596d1d03c4ea704cbeb250",
  //           country: filterData.country,
  //           min_price: filterData.price.min,
  //           max_price: filterData.price.max,
  //           category_id: categoryValues,
  //         },
  //       }
  //     );

  //     const products = Array.isArray(response.data.data.products)
  //       ? response.data.data.products
  //       : [];

  //     const filteredProducts = products.filter((product) => {
  //       const title = product.product_title.toLowerCase();
  //       return !excludeKeywordsArray.some((keyword) => title.includes(keyword));
  //     });

  //     setData(filteredProducts);
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
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  Sales Volume sales Condition

  // const handleSearch = async () => {
  //   if (
  //     !filterData ||
  //     !filterData.selectedCategories ||
  //     filterData.selectedCategories.length === 0
  //   ) {
  //     setError("Please select at least one category.");
  //     return;
  //   }
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const categoryLabels = filterData.selectedCategories
  //       .map((category) => category.label.replace(/\s+/g, "-"))
  //       .join(",");
  //     const categoryValues = filterData.selectedCategories
  //       .map((category) => category.value)
  //       .join(",");

  //     const response = await axios.get(
  //       "https://api.proleverageadmin.in/api/amazon/getitems2",
  //       {
  //         params: {
  //           query: categoryLabels,
  //           userId: "67596d1d03c4ea704cbeb250",
  //           country: filterData.country,
  //           min_price: filterData.price.min,
  //           max_price: filterData.price.max,
  //           category_id: categoryValues,
  //         },
  //       }
  //     );

  //     const products = Array.isArray(response.data.data.products)
  //       ? response.data.data.products
  //       : [];

  //     // Filter products based on sales_volume and filterData.sales
  //     const filteredProducts = products.filter((product) => {
  //       const title = product.product_title.toLowerCase();
  //       const salesVolume = convertSalesVolume(product.sales_volume);

  //       // Check if the sales volume is within the specified range
  //       const withinSalesRange =
  //         filterData.sales &&
  //         salesVolume >= Number(filterData.sales.min) &&
  //         salesVolume <= Number(filterData.sales.max);

  //       // Check if the title does not include excluded keywords
  //       const matchesKeywords = !excludeKeywordsArray.some((keyword) =>
  //         title.includes(keyword)
  //       );

  //       // Return products that match both conditions
  //       return withinSalesRange && matchesKeywords;
  //     });

  //     console.log("Filtered Products:", filteredProducts);
  //     setData(filteredProducts);
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
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = async () => {
  //   if (
  //     !filterData ||
  //     !filterData.selectedCategories ||
  //     filterData.selectedCategories.length === 0
  //   ) {
  //     setError("Please select at least one category.");
  //     return;
  //   }
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const categoryLabels = filterData.selectedCategories
  //       .map((category) => category.label.replace(/\s+/g, "-"))
  //       .join(",");
  //     const categoryValues = filterData.selectedCategories
  //       .map((category) => category.value)
  //       .join(",");

  //     const response = await axios.get(
  //       "https://api.proleverageadmin.in/api/amazon/getitems2",
  //       {
  //         params: {
  //           query: categoryLabels,
  //           userId: "67596d1d03c4ea704cbeb250",
  //           country: filterData.country,
  //           min_price: filterData.price.min,
  //           max_price: filterData.price.max,
  //           category_id: categoryValues,
  //         },
  //       }
  //     );

  //     const products = Array.isArray(response.data.data.products)
  //       ? response.data.data.products
  //       : [];

  //     // Filter products based on sales_volume and filterData.sales
  //     const filteredProducts = products.filter((product) => {
  //       const title = product.product_title.toLowerCase();
  //       const salesVolume = convertSalesVolume(product.sales_volume);

  //       // Only include products with a valid sales_volume and within range
  //       const hasValidSalesVolume = salesVolume;
  //       const withinSalesRange =
  //         filterData.sales &&
  //         hasValidSalesVolume &&
  //         salesVolume >= Number(filterData.sales.min) &&
  //         salesVolume <= Number(filterData.sales.max);

  //       // Check if the title does not include excluded keywords
  //       const matchesKeywords = !excludeKeywordsArray.some((keyword) =>
  //         title.includes(keyword)
  //       );

  //       // Return products that match both conditions
  //       return withinSalesRange && matchesKeywords;
  //     });

  //     console.log("Filtered Products:", filteredProducts);
  //     setData(filteredProducts);
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
  //   } finally {
  //     setLoading(false);
  //   }
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
        const salesVolume = convertSalesVolume(product.sales_volume);

        const withinSalesRange =
          (!filterData.sales?.min && !filterData.sales?.max) ||
          (salesVolume >= Number(filterData.sales?.min || 0) &&
            salesVolume <= Number(filterData.sales?.max || Infinity));

        const matchesKeywords = !excludeKeywordsArray.some((keyword) =>
          title.includes(keyword)
        );

        return withinSalesRange && matchesKeywords;
      });

      console.log("Filtered Products:", filteredProducts);
      setData(filteredProducts);
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
                <>
                  <ul>
                    {data.slice(0, itemsToShow).map((item, index) => (
                      <Link
                        key={item.asin}
                        state={{ data: item }}
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={(e) => {
                          // setclickdata(item);
                          e.preventDefault();
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
                              {convertSalesVolume(item.sales_volume)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </ul>

                  {itemsToShow < data.length && (
                    <div
                      className="poppins-regular"
                      onClick={handleShowMore}
                      style={{
                        margin: "20px auto",
                        display: "block",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "200px",
                        textAlign: "center",
                      }}
                    >
                      Show More
                    </div>
                  )}
                </>
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
