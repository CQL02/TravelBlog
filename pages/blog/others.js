import Layout from "../../component/Layout";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import BlogListView from "@/component/BlogListView";
import { useState, useEffect } from "react";

export default function viewPostsPage() {
  //load data
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/postdata.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //ensure the posts are posted from same person
  const sorted = data.filter((data) => data.username === "alibinabu");

  return (
    <Layout>
      <div className="avatar-container">
        <Avatar
          alt="alibinabu"
          src="https://th.bing.com/th/id/OIP.WlUDXSME4D1KBxKlZEtVuwHaKA?pid=ImgDet&rs=1"
          sx={{ width: 80, height: 80, marginTop: 3 }}
        />
      </div>
      <Typography className="username-text">alibinabu</Typography>
      <Typography className="description">
        Alibinabu is a software engineering who likes to travel around the world
      </Typography>

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
          description={data.description}
        />
      ))}
    </Layout>
  );
}
