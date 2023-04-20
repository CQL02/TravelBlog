import { Avatar, Box, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function Comment(props) {
  const { id, username, profileImage, date, rating, comment } = props;

  return (
    <Box className="comment-parent-box">
      <Box className="comment-profile-box">
        <Avatar sx={{ maxWidth: "30px", maxHeight: "30px" }} />
        <Box className="comment-profile-text-box">
          <Box className="comment-profile-box-2">
            <Typography className="comment-profile-username-text">
              {username}
            </Typography>
            <Typography
              className="comment-profile-helper-text"
              sx={{ alignSelf: "flex-end" }}
            >
              {date}
            </Typography>
          </Box>
          <Typography className="comment-profile-helper-text">
            <StarRateIcon className="comment-profile-icon" />
            {rating}
          </Typography>
        </Box>
      </Box>
      <Typography className="comment-content" align="justify">
        {comment}
      </Typography>
    </Box>
  );
}
