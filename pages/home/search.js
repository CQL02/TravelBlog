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
  const search = router.query.search;

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
    if (item.title.toLowerCase().includes(search.toLowerCase())) {
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
        SEARCH RESULT:{search}
      </Typography>
      {filteredData.map((data) => (
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
