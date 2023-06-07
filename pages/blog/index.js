import Layout from "../../component/Layout";
import { Avatar, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import BlogListView from "@/component/BlogListView";
import { useRouter } from "next/router";
import { UserContext } from "@/component/auth";

export default function ViewPostsPage() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOwn, setIsOwn] = useState(true);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const { userid } = router.query;

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data[0]);
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/view/post/user/${userid}`,
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
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchPosts();
  }, [userid]);

  useEffect(() => {
    if (userid && user?.user_id) {
      if (parseInt(userid) === parseInt(user.user_id)) {
        setIsOwn(true);
      } else {
        setIsOwn(false);
      }
    }
  }, [userid, user?.user_id]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {userDetails?.user_image && (
        <div>
          <div className="avatar-container">
            <Avatar
              alt={userDetails.username}
              src={convertBufferToBase64(userDetails.user_image)}
              sx={{ width: 80, height: 80, marginTop: 3, cursor: "pointer" }}
              onClick={() =>
                router.push(`/profile?userid=${userDetails.user_id}`)
              }
            />
          </div>
          <Typography className="username-text">
            {userDetails.username}
          </Typography>
        </div>
      )}
      {data.map((post) => (
        <BlogListView
          key={post.post_id}
          id={post.post_id}
          image={post.post_image}
          country={post.post_country}
          title={post.post_title}
          username={post.username}
          date={post.post_time}
          like={post.total_likes}
          view={post.total_views}
          rating={post.average_rating}
          description={post.post_description}
          isOwn={isOwn}
          onDelete={console.log("delete")}
        />
      ))}
    </Layout>
  );
}
