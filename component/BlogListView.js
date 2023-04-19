import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";

export default function bloglistview(props) {
  const { id, image, country, title, username, date, like, view, rating } =
    props;

  return (
    <Box className="search-country-box" key={id}>
      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        style={{ width: "250px", height: "141px", borderRadius: "10px" }}
      />
      <Box key={id}>
        <Typography className="search-country-country-text">
          {country}
        </Typography>

        <Typography className="search-country-title-text">{title}</Typography>

        <Box className="search-country-helper-text-box">
          <Typography className="search-country-helper-text">
            <PersonIcon className="search-country-icon" />
            {username}
          </Typography>
          <Typography className="search-country-helper-text">{date}</Typography>
        </Box>

        <Box className="search-country-helper-text-box">
          <Typography className="search-country-helper-text">
            <FavoriteIcon className="search-country-icon" />
            {like + "\t"}
          </Typography>
          <Typography className="search-country-helper-text">
            <RemoveRedEyeIcon className="search-country-icon" />
            {view + " "}
          </Typography>
          <Typography className="search-country-helper-text">
            <StarRateIcon className="search-country-icon" />
            {rating + " "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
