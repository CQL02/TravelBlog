import Layout from "../../component/Layout";
import { Avatar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import BlogListView from "@/component/BlogListView";
import { useRouter } from "next/router";

export default function ViewPostsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/profiledata.json");
        setUsername(
          response.data.filter((data) => data.email === session.user.email)[0]
            .username
        );
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    if (session) {
      fetchProfileData();
    }
  }, [session]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("/postdata.json");
        setPosts(response.data.filter((post) => post.username === username));
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchPostData();
    }
  }, [username]);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="avatar-container">
        <Avatar
          alt={username}
          src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
          sx={{ width: 80, height: 80, marginTop: 3, cursor: "pointer" }}
          onClick={() => router.push("/profile")}
        />
      </div>
      <Typography className="username-text">{username}</Typography>
      <Typography className="description">
        {username} is a software engineer who likes to travel around the world.
      </Typography>
      {posts.map((post) => (
        <BlogListView
          key={post.id}
          id={post.id}
          image={post.image}
          country={post.country}
          title={post.title}
          username={post.username}
          date={post.date}
          like={post.like}
          view={post.view}
          rating={post.rating}
          description={post.description}
          isOwn={true}
          onDelete={() => handleDeletePost(post.id)}
        />
      ))}
    </Layout>
  );
}
