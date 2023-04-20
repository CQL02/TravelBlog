import Layout from "@/component/Layout";
import BlogView from "@/component/BlogView";
import Comment from "@/component/Comment";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Rating, TextField, Typography, Box } from "@mui/material";

const data = {
  id: 1,
  username: "alibinabu",
  userImage: "ali",
  title: "travel to Japan",
  image: "ali",
  date: "18-4-2023",
  country: "Asia",
  like: 243,
  view: 500,
  rating: 2.9,
  description:
    "How do we become better every single day? We develop practices that will help move us incrementally forward. Small steps, taken consistently. This is the path to a good life.While routines can be important for consistency and productivity, what is even more important is our practices. These are things we do, no matter what our routine looks like, no matter if something comes up that derails us.But we need to start small and make sure our practices are sustainable. The idea is to take small but consistent steps, every single day — 1% improvement.",
};

export default function view() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/comment.json");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const [ratingValue, setRatingValue] = useState(2.5);

  return (
    <Layout>
      <BlogView
        key={data.id}
        image={data.image}
        title={data.title}
        username={data.username}
        date={data.date}
        like={data.like}
        view={data.view}
        rating={data.rating}
        description={data.description}
      />

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
          style={{ color: "black" }}
        />
      </Box>

      <Box className="view-blog-description flex-col">
        <TextField
          multiline
          placeholder="comments..."
          rows={5}
          className="comment-profile-description "
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
        >
          SAVE
        </Button>
      </Box>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          username={comment.username}
          profileImage={comment.profileImage}
          date={comment.date}
          rating={comment.rating}
          comment={comment.comment}
        />
      ))}
    </Layout>
  );
}
