import { Typography, Box, Avatar, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function blogview(props) {
  const { id, image, title, username, date, like, view, rating, description } =
    props;

  const router = useRouter();
  return (
    <Box>
      <Box className="w-[600px] ml-auto mr-auto flex">
        <Button className="headerButton" onClick={() => router.back()}>
          <ArrowBack />
          BACK
        </Button>
      </Box>

      <Typography className="view-blog-title w-[600px]" align="center">
        {title}
      </Typography>

      <Box className="view-blog-profile-box">
        <Avatar src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg" />
        <Box>
          <Box className="search-country-helper-text-box">
            <Typography>{username}</Typography>
            <Typography
              className="view-blog-profile-view"
              onClick={() => router.push(`/blog/others?user=${username}`)}
            >
              View Blog
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
        src={image}
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
