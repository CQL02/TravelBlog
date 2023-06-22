import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./auth";
import apiUrl from "../pages/api/apiConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MyChart(props) {
  const { overallRate } = props;
  const { user } = useContext(UserContext);

  const today = new Date();
  const likeData = [];
  const viewData = [];
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString());
    likeData.push({ date: date.toLocaleDateString(), likes: 0 });
    viewData.push({ date: date.toLocaleDateString(), views: 0 });
  }

  const [postdata, setPostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/stats/dailyStats/${user?.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPostData(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const getMaxY = Math.max(
    Math.max(...postdata.map((data) => data.total_views)),
    Math.max(...postdata.map((data) => data.total_likes))
  );
  const roundedMaxY = Math.ceil(getMaxY / 100000) * 100000;
  const stepSize = roundedMaxY / 5;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Likes",
        data: postdata.map((data) => data.total_likes),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "View",
        data: postdata.map((data) => data.total_views),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const formatnumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "b";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "m";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "k";
    }
    return num;
  };

  const totalLike = postdata.reduce((sum, item) => {
    return sum + item.total_likes;
  }, 0);

  const totalView = postdata.reduce((sum, item) => {
    return sum + item.total_views;
  }, 0);

  return (
    <Box
      border={1}
      borderColor="blue"
      padding={2}
      marginTop={2}
      marginBottom={2}
      boxShadow={2}
      borderRadius={2}
      style={{ marginLeft: "4rem", marginRight: "4rem" }}
    >
      <Box className="flex justify-between">
        <Box>
          <Typography variant="subtitle1" color="primary">
            Overall Rating
          </Typography>
          <Box className="details">
            <Typography variant="h4" color="textPrimary" fontWeight="bold">
              {overallRate}
            </Typography>
            <Rating
              name="rating"
              value={parseFloat(overallRate)}
              precision={0.1}
              readOnly
              style={{ marginLeft: "8px", color: "#AED2E4" }}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="primary">
            Total Likes (last week)
          </Typography>
          <Typography variant="h4" color="textPrimary" fontWeight="bold">
            {formatnumber(totalLike)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle" color="primary">
            Total Views (last week)
          </Typography>
          <Typography variant="h4" color="textPrimary" fontWeight="bold">
            {formatnumber(totalView)}
          </Typography>
        </Box>
      </Box>

      <div className=" justify-center flex-col mt-4">
        <Typography color="primary" mb={1}>
          Updated
          {" " + today.toDateString()}
        </Typography>
        <Line options={options} data={data} />
      </div>
    </Box>
  );
}
