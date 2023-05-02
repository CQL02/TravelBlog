import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import BlogListView from "@/component/BlogListView";

export default function SearchCountry() {
  const router = useRouter();
  const { search } = router.query;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/postdata.json");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(({ title }) =>
    title.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <Layout>
      <Link href="/country">
        <Button className="headerButton" sx={{ position: "absolute" }}>
          <ArrowBackIcon />
          BACK
        </Button>
      </Link>
      <Typography className="search-country-main-title" align="center">
        SEARCH RESULT: {search}
      </Typography>
      {isLoading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        filteredData.map(
          ({
            id,
            image,
            country,
            title,
            username,
            date,
            like,
            view,
            rating,
          }) => (
            <BlogListView
              key={id}
              id={id}
              image={image}
              country={country}
              title={title}
              username={username}
              date={date}
              like={like}
              view={view}
              rating={rating}
            />
          )
        )
      ) : (
        <p>No data found</p>
      )}
    </Layout>
  );
}
