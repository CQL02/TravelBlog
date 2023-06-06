import { useState, useEffect, useContext } from "react";
import Layout from "../../component/Layout";
import BlogListView from "@/component/BlogListView";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { UserContext } from "@/component/auth";

export default function homeindex() {
  const [data, setData] = useState([]);
  const [topView, setTopView] = useState(null);

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/view/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/view/homeTop", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTopView(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Typography className="home-title-text">Popular Blogs</Typography>
      {topView && (
        <Link href={`/home/view?id=${topView.post_id}`}>
          <Box className="home-popular-box">
            <img
              src={convertBufferToBase64(topView.post_image)}
              style={{
                width: "700px",
                maxHeight: "394px",
                borderRadius: "10px",
              }}
            />
            <Box key={topView.post_id}>
              <Box className="home-popular-helper-text-box">
                <Typography className="home-popular-country">
                  {topView.post_country}
                </Typography>
                <Typography className="search-country-helper-text">
                  {new Date(topView.post_time).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography className="home-popular-title-text">
                {topView.post_title}
              </Typography>

              <Box className="home-popular-helper-text-box">
                <Typography className="search-country-helper-text">
                  <PersonIcon className="search-country-icon" />
                  {topView.username}
                </Typography>
                <Box className="search-country-helper-text-box">
                  <Typography className="search-country-helper-text">
                    <FavoriteIcon className="search-country-icon" />
                    {topView.total_likes + "\t"}
                  </Typography>
                  <Typography className="search-country-helper-text">
                    <RemoveRedEyeIcon className="search-country-icon" />
                    {topView.total_views + " "}
                  </Typography>
                  <Typography className="search-country-helper-text">
                    <StarRateIcon className="search-country-icon" />
                    {topView.average_rating + " "}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      )}

      <Typography className="home-title-text">Recommandation</Typography>
      {data.map((data) => (
        <BlogListView
          key={data.post_id}
          id={data.post_id}
          image={data.post_image}
          country={data.post_country}
          title={data.post_title}
          username={data.username}
          date={data.post_time}
          like={data.total_likes}
          view={data.total_views}
          rating={data.average_rating}
        />
      ))}
    </Layout>
  );
}
