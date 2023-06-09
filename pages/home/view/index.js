import Layout from "@/component/Layout";
import BlogView from "@/component/BlogView";
import Comment from "@/component/Comment";
import { useState, useEffect } from "react";
import {
  Button,
  Rating,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { Favorite } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "@/component/auth";

export default function View() {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const router = useRouter();
  const [ratingValue, setRatingValue] = useState(2.5);
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [like, setLike] = useState("");
  const [view, setView] = useState(false);

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitComment = {
      post_id: id,
      user_id: user?.user_id,
      comment_rating: ratingValue,
      comment_desc: userComment,
      owner_id: data?.user_id,
    };

    try {
      const response = await fetch(`http://localhost:8080/blog/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitComment),
      });

      if (response.ok) {
        setRatingValue(2.5);
        setUserComment("");
        fetchComments();
      } else {
        console.error("Failed to Like post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

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

    const fetchView = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/stats/checkView?post_id=${id}&user_id=${user?.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const count = parseInt(data[0].count);
          if (count === 1) {
            setView(true);
          } else {
            setView(false);
          }
        } else {
          console.error("Failed to fetch view. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching view: ", error);
      }
    };

    const fetchLike = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/stats/checkLike?post_id=${id}&user_id=${user?.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (parseInt(data[0].count) === 1) setLike(true);
          else setLike(false);
        } else {
          console.error("Failed to fetch like. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching like: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchLike();
    fetchView();
  }, [id, user?.user_id]);

  useEffect(() => {
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (data?.user_id && !view) {
      sendPostView();
      return;
    }
  }, [view, data]);

  const handleLike = async () => {
    const postLike = {
      post_id: id,
      user_id: user?.user_id,
      owner_id: data?.user_id,
    };
    try {
      const response = await fetch(`http://localhost:8080/stats/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postLike),
      });

      if (response.ok) {
        setLike(true);
      } else {
        console.error("Failed to Like post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/stats/like?post_id=${id}&user_id=${user?.user_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setLike(false);
      } else {
        console.error("Failed to unlike post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error when unliking post: ", error);
    }
  };

  const sendPostView = async () => {
    const postView = {
      post_id: id,
      user_id: user?.user_id,
      owner_id: data?.user_id,
    };

    try {
      const response = await fetch(`http://localhost:8080/stats/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postView),
      });

      if (response.ok) {
        setView(true);
      } else {
        console.error("Failed to send post view. Status:", response.status);
      }
    } catch (error) {
      console.error("Error sending post view: ", error);
    }
  };

  const fetchComments = async () => {
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
    }
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

      <Box className="view-blog-description">
        <Typography className="font-bold mt-10">LIKE POST</Typography>
        {like ? (
          <Button
            className="bg-red-600 hover:bg-red-800 text-white rounded-xl w-[80px]"
            onClick={handleUnlike}
          >
            <Favorite className="text-xl pr-[5px]" />
            LIKED
          </Button>
        ) : (
          <Button
            className="bg-red-100 hover:bg-red-200 text-red-800 rounded-xl w-[80px]"
            onClick={handleLike}
          >
            <Favorite className="text-xl pr-[5px]" />
            LIKE
          </Button>
        )}
      </Box>

      <Typography className="view-blog-description font-bold mt-5">
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
          id={comment.comment_id}
          user_id={comment.user_id}
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
