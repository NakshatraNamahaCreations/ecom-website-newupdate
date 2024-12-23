import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Blackboxdetails() {
  const location = useLocation();
  const filterData = location.state?.filterData; // Access passed data
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!filterData || !filterData.keyword) {
      setError("Keyword is missing in the filter data.");
      return;
    }

    setError(""); // Reset error
    setLoading(true);

    try {
      // Perform the product search
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/amazon/getitems1",
        {
          params: {
            query: filterData.keyword, // Use the keyword from filterData
            userId: "67596d1d03c4ea704cbeb250", // Pass the user ID
            country: filterData.country, // Pass the country from filterData
          },
        }
      );

      const products = response.data.data.products || [];
      setData(products.slice(0, 10));
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
    }

    setLoading(false);
  };

  useEffect(() => {
    handleSearch(); // Automatically search when the component loads
  }, []);

  console.log("data", data);
  console.log("filterData", filterData);

  return (
    <div>
      <div className="poppins-medium text-center">Blackboxdetails</div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.length > 0 ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  <strong>Title:</strong> {item.product_title} <br />
                  <strong>Price:</strong> {item.product_price} <br />
                  <strong>Category:</strong> {item.category}
                </li>
              ))}
            </ul>
          ) : (
            <div>No data found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Blackboxdetails;
