import Layout from "@/component/Layout";
import { Box, Button, Chip, InputBase, Typography } from "@mui/material";
import { useState, useRef } from "react";
import ImageIcon from "@mui/icons-material/Image";

export default function createIndex() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file || !(file instanceof Blob)) {
      console.error("Invalid file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleChipClick() {
    fileInputRef.current.click();
  }

  function handleOpenImage() {
    if (image) {
      const newWindow = window.open();
      newWindow.document.write(
        `<img src="${image}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`
      );
    }
  }

  function handleResetImage() {
    setImage(null);
  }

  return (
    <Layout>
      <Typography className="flex justify-center home-title-text">
        CREATE POST
      </Typography>
      <Box className="flex mt-1 justify-center">
        <Typography className="create-title">COUNTRY</Typography>
        <InputBase className="create-input" />
      </Box>

      <Box className="flex mt-1 justify-center">
        <Typography className="create-title ">TITLE</Typography>
        <InputBase className="create-input" />
      </Box>

      <Box className="w-[600px] ml-auto mr-auto">
        <InputBase
          className="create-input-description"
          multiline
          rows={10}
          fullWidth
        />
      </Box>
      <Box className="flex w-[600px] ml-auto mr-auto mt-[5px] mb-[5px]">
        <div>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {image ? (
            <Box className="flex align-center">
              <Chip
                label="Click to view image"
                onClick={handleOpenImage}
                variant="outlined"
                sx={{ cursor: "pointer", mr: 1 }}
                onDelete={handleResetImage}
                avatar={<ImageIcon />}
              />
            </Box>
          ) : (
            <Chip
              label="Upload image"
              color="default"
              onClick={handleChipClick}
            />
          )}
        </div>
        <Box className="ml-auto ">
          <Button className="headerButton" size="small">
            POST
          </Button>
          <Button className="headerButton" size="small">
            CANCEL
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
