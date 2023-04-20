import { Typography, Box, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function blogview(props) {
  const { id, image, title, username, date, like, view, rating, description } =
    props;

  return (
    <Box>
      <Typography className="view-blog-title" align="center">
        {title}
      </Typography>

      <Box className="view-blog-profile-box">
        <Avatar src="https://img.freepik.com/premium-photo/handsome-young-businessman-shirt-eyeglasses_85574-6228.jpg" />
        <Box>
          <Box className="search-country-helper-text-box">
            <Typography>{username}</Typography>
            <Typography className="view-blog-profile-view">
              View Profile
            </Typography>
          </Box>
          <Typography
            className="search-country-helper-text"
            sx={{ pl: "10px" }}
          >
            {date}
          </Typography>
        </Box>
      </Box>

      <Box className="view-blog-like-view-box">
        <Typography className="search-country-helper-text">
          <FavoriteIcon className="search-country-icon" />
          {like}
        </Typography>
        <Typography className="search-country-helper-text">
          <RemoveRedEyeIcon className="search-country-icon" />
          {view}
        </Typography>
      </Box>

      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        style={{
          maxWidth: "600px",
          maxHeight: "338px",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Typography
        className="view-blog-description"
        align="justify"
        sx={{ mt: "10px" }}
      >
        {description}
      </Typography>
    </Box>
  );
}
