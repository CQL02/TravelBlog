import Layout from "@/component/Layout";
import BlogView from "@/component/BlogView";
import Comment from "@/component/Comment";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Rating, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const [ratingValue, setRatingValue] = useState(2.5);
  const { id } = router.query;

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

  const filteredData = data.filter((item) => item.id === parseInt(id));

  return (
    <Layout>
      {filteredData.length > 0 && (
        <BlogView
          key={filteredData[0].id}
          id={filteredData[0].id}
          image={filteredData[0].image}
          title={filteredData[0].title}
          username={filteredData[0].username}
          date={filteredData[0].date}
          like={filteredData[0].like}
          view={filteredData[0].view}
          rating={filteredData[0].rating}
          description={filteredData[0].description}
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
