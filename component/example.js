import React, { useState, useEffect } from "react";
import axios from "axios";

// const data = [
//   { name: "John", age: 30, city: "New York" },
//   { name: "John", age: 32, city: "New York" },
//   { name: "John", age: 34, city: "New York" },
//   { name: "John", age: 35, city: "New York" },
// ];

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/test.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      {data.map((data) => (
        <div>
          <h1>Name: {data.name}</h1>
          <p>Age: {data.age}</p>
          <p>City: {data.city}</p>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
