import Layout from "@/component/Layout";
import { Box, Button, Chip, InputBase, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/router";
import axios from "axios";

export default function createIndex() {
  const [image, setImage] = useState(null);
  const [thisPost, setThisPost] = useState([]);
  const fileInputRef = useRef();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/postdata.json");
        const filteredData = response.data.filter(
          (item) => item.id === parseInt(id)
        );
        setThisPost(filteredData[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...thisPost, [name]: value };
    setThisPost(newUserData);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const updatedPost = {
      ...thisPost,
      country: document.getElementById("country").value,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
    };

    alert("Post is updated" + JSON.stringify(updatedPost));
    setThisPost(updatedPost);
  };

  return (
    <Layout>
      {thisPost && (
        <Box>
          <Typography className="flex justify-center home-title-text">
            CREATE POST
          </Typography>
          <Box className="flex mt-1 justify-center">
            <Typography className="create-title">COUNTRY</Typography>
            <InputBase
              id="country"
              className="create-input"
              defaultValue={thisPost.country}
              onChange={handleInputChange}
            />
          </Box>

          <Box className="flex mt-1 justify-center">
            <Typography className="create-title ">TITLE</Typography>
            <InputBase
              id="title"
              className="create-input"
              defaultValue={thisPost.title}
              onChange={handleInputChange}
            />
          </Box>

          <Box className="w-[600px] ml-auto mr-auto">
            <InputBase
              id="description"
              className="create-input-description"
              multiline
              rows={10}
              fullWidth
              defaultValue={thisPost.description}
              onChange={handleInputChange}
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
              <Button
                className="headerButton"
                size="small"
                onClick={(event) => {
                  handleOnClick(event);
                  router.back();
                }}
              >
                SAVE
              </Button>
              <Button
                className="headerButton"
                size="small"
                onClick={() => router.back()}
              >
                CANCEL
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Layout>
  );
}
