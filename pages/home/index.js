import { useState, useEffect } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import BlogListView from "@/component/BlogListView";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

export default function homeindex() {
  const [data, setData] = useState([]);
  const [topView, setTopView] = useState(null);

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

  useEffect(() => {
    if (data.length > 0) {
      const sorted = data.sort((a, b) => {
        return b.view - a.view;
      });
      setTopView(sorted[0]);
    }
  }, [data]);

  const sorted = data
    .sort((a, b) => {
      return b.view - a.view;
    })
    .slice(1, 11);

  return (
    <Layout>
      <Typography className="home-title-text">Popular Blogs</Typography>
      {topView && (
        <Link href={`/home/view?id=${topView.id}`}>
          <Box className="home-popular-box">
            <img
              src={topView.image}
              style={{
                width: "700px",
                maxHeight: "394px",
                borderRadius: "10px",
              }}
            />
            <Box key={topView.id}>
              <Box className="home-popular-helper-text-box">
                <Typography className="home-popular-country">
                  {topView.country}
                </Typography>
                <Typography className="search-country-helper-text">
                  {topView.date}
                </Typography>
              </Box>

              <Typography className="home-popular-title-text">
                {topView.title}
              </Typography>

              <Box className="home-popular-helper-text-box">
                <Typography className="search-country-helper-text">
                  <PersonIcon className="search-country-icon" />
                  {topView.username}
                </Typography>
                <Box className="search-country-helper-text-box">
                  <Typography className="search-country-helper-text">
                    <FavoriteIcon className="search-country-icon" />
                    {topView.like + "\t"}
                  </Typography>
                  <Typography className="search-country-helper-text">
                    <RemoveRedEyeIcon className="search-country-icon" />
                    {topView.view + " "}
                  </Typography>
                  <Typography className="search-country-helper-text">
                    <StarRateIcon className="search-country-icon" />
                    {topView.rating + " "}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      )}

      <Typography className="home-title-text">Recommandation</Typography>
      {sorted.map((data) => (
        <BlogListView
          key={data.id}
          id={data.id}
          image={data.image}
          country={data.country}
          title={data.title}
          username={data.username}
          date={data.date}
          like={data.like}
          view={data.view}
          rating={data.rating}
        />
      ))}
    </Layout>
  );
}
