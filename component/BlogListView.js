import { Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useState, useRef } from "react";
import Dialog from "@/component/deleteModal";
import Link from "next/link";

export default function bloglistview(props) {
  const {
    id,
    image,
    country,
    title,
    username,
    date,
    like,
    view,
    rating,
    description,
    isOwn,
    onDelete,
  } = props;

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const handleDelete = (event) => {
    event.stopPropagation();
    handleDialog("Are you sure you want to delete this post?", true);
  };

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      //suppose to call api
      onDelete(id);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <Box>
      {isOwn ? (
        <Box className="icon-button-box">
          <IconButton size="small" href={`/home/view/edit?id=${id}`}>
            <EditOutlined className="icon-button-icon" />
          </IconButton>
          <IconButton size="small" onClick={(event) => handleDelete(event)}>
            <DeleteOutline className="icon-button-icon" />
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
      <Link href={`/home/view?id=${id}`}>
        <Box className="search-country-box" key={id}>
          <img
            src={image}
            style={{ width: "250px", height: "141px", borderRadius: "10px" }}
          />
          <Box key={id}>
            <Box className="flex">
              <Typography className="search-country-country-text">
                {country}
              </Typography>
            </Box>

            <Typography className="search-country-title-text">
              {title}
            </Typography>

            <Box className="search-country-helper-text-box">
              <Typography className="search-country-helper-text">
                <PersonIcon className="search-country-icon" />
                {username}
              </Typography>
              <Typography className="search-country-helper-text">
                {date}
              </Typography>
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
      </Link>
      {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message} />
      )}
    </Box>
  );
}
