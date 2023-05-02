import Layout from "../../component/Layout";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import BlogListView from "@/component/BlogListView";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function viewPostsPage() {
  //load data
  const [data, setData] = useState([]);

  const router = useRouter();
  const { user } = router.query;

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
  const sorted = data.filter((data) => data.username === user);

  return (
    <Layout>
      <div className="avatar-container">
        <Avatar
          alt="alibinabu"
          src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
          sx={{ width: 80, height: 80, marginTop: 3, cursor: "pointer" }}
          onClick={() => router.push(`/profile/others?user=${user}`)}
        />
      </div>
      <Typography className="username-text">{user}</Typography>
      <Typography className="description">
        {user} is a software engineering who likes to travel around the world
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
