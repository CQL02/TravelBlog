import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "./auth";
import apiUrl from '../pages/api/apiConfig';

export default function Comment(props) {
  const { id, user_id, image, username, date, rating, comment } = props;
  const { user } = useContext(UserContext);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/blog/delComment/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Comment deleted");
        window.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error Deleting comment: ", error);
      alert("An error occurred while deleting comment");
    }
  };

  return (
    <Box className="comment-parent-box">
      <Box className="comment-profile-box">
        <Avatar src={image} sx={{ maxWidth: "30px", maxHeight: "30px" }} />
        <Box className="comment-profile-text-box">
          <Box className="comment-profile-box-2">
            <Typography className="comment-profile-username-text">
              {username}
            </Typography>
            <Typography
              className="comment-profile-helper-text"
              sx={{ alignSelf: "flex-end" }}
            >
              {new Date(date).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography className="comment-profile-helper-text">
            <StarRateIcon className="comment-profile-icon" />
            {parseFloat(rating).toFixed(1)}
          </Typography>
        </Box>

        {user_id == user?.user_id ? (
          <Button
            size="small"
            className="text-xs text-black ml-auto"
            onClick={handleDelete}
          >
            <Delete className="text-base" /> DELETE COMMENT
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <Typography className="comment-content" align="justify">
        {comment}
      </Typography>
    </Box>
  );
}
