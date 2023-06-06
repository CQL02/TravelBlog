import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import BlogListView from "@/component/BlogListView";

export default function searchcountry() {
  const router = useRouter();
  const { country } = router.query;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/view/post/country/${country}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
