import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function searchcountry() {
  const router = useRouter();
  const { country } = router.query;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/postdata.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.reduce((acc, item) => {
    if (item.country === country) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <Layout>
      <Link href="/country">
        <Button className="headerButton" sx={{ position: "absolute" }}>
          <ArrowBackIcon />
          BACK
        </Button>
      </Link>
      <Typography className="search-country-main-title" align="center">
        {country}
      </Typography>
      {filteredData.map((data) => (
        <Box className="search-country-box" key={data.id}>
          <img
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
            style={{ width: "250px", height: "141px" }}
          />
          <Box key={data.id}>
            <Typography className="search-country-country-text">
              {data.country}
            </Typography>

            <Typography className="search-country-title-text">
              {data.title}
            </Typography>

            <Box className="search-country-helper-text-box">
              <Typography className="search-country-helper-text">
                <PersonIcon className="search-country-icon" />
                {data.username}
              </Typography>
              <Typography className="search-country-helper-text">
                {data.date}
              </Typography>
            </Box>

            <Box className="search-country-helper-text-box">
              <Typography className="search-country-helper-text">
                <FavoriteIcon className="search-country-icon" />
                {data.like + "\t"}
              </Typography>
              <Typography className="search-country-helper-text">
                <RemoveRedEyeIcon className="search-country-icon" />
                {data.view + " "}
              </Typography>
              <Typography className="search-country-helper-text">
                <StarRateIcon className="search-country-icon" />
                {data.rating + " "}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Layout>
  );
}
