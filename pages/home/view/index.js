import Layout from "@/component/Layout";
import BlogView from "@/component/BlogView";
import Comment from "@/component/Comment";
import { useState, useEffect } from "react";
import { Button, Rating, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function View() {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const router = useRouter();
  const [ratingValue, setRatingValue] = useState(2.5);
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Your comment is successfully saved! Your comment is " +
        userComment +
        " with rating " +
        ratingValue
    );
    setUserComment("");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/view/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data[0]);
        } else {
          console.error("Failed to fetch data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchComment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/blog/comments/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchComment();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {data && data.post_image && (
        <BlogView
          key={data.post_id}
          id={data.user_id}
          profileImage={convertBufferToBase64(data.user_image)}
          image={convertBufferToBase64(data.post_image)}
          title={data.post_title}
          username={data.username}
          date={data.post_time}
          like={data.total_likes}
          view={data.total_views}
          rating={data.average_rating}
          description={data.post_description}
        />
      )}

      <Typography className="view-blog-description font-bold mt-10">
        COMMENTS
      </Typography>

      <Box className="view-blog-description flex">
        <Typography>RATING: </Typography>
        <Rating
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
          precision={0.5}
          size="small"
        />
      </Box>

      <Box className="view-blog-description flex-col">
        <TextField
          multiline
          placeholder="comments..."
          rows={5}
          className="comment-profile-description "
          name="comment"
          value={userComment}
          onChange={handleCommentChange}
          InputProps={{
            style: {
              fontSize: 14,
            },
          }}
        />
        <Button
          variant="contained"
          className="comment-profile-button"
          size="small"
          onClick={handleSubmit}
        >
          SAVE
        </Button>
      </Box>

      {comments.map((comment) => (
        <Comment
          key={comment.comment_id}
          username={comment.username}
          image={convertBufferToBase64(comment.user_image)}
          date={comment.comment_time}
          rating={comment.comment_rating}
          comment={comment.comment_description}
        />
      ))}
    </Layout>
  );
}
