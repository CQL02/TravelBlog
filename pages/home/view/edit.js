import Layout from "@/component/Layout";
import {
  Box,
  Button,
  Chip,
  InputBase,
  Typography,
  TextField,
  styled,
  MenuItem,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/router";
import apiUrl from '../../api/apiConfig'

const countries = [
  "Antarctica",
  "Africa",
  "Asia",
  "Australia",
  "Europe",
  "North America",
  "South America",
];

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
}));

export default function CreateIndex() {
  const router = useRouter();
  const fileInputRef = useRef();
  const { id } = router.query;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [thisPost, setThisPost] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/view/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (
            Array.isArray(data) &&
            data.length > 0 &&
            data[0].post_image &&
            data[0].post_image.data
          ) {
            const imageData = data[0].post_image.data;
            const imageBuffer = Buffer.from(imageData);
            const imageType = data[0].post_image.type;
            const imageFileName = "post_image";
            const imageFile = new File([imageBuffer], imageFileName, {
              type: imageType,
            });

            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
            setImageFile(imageFile);
          }
          setCountry(data[0]?.post_country);
          setThisPost(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSelectChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !(file instanceof Blob)) {
      console.error("Invalid file selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleChipClick = () => {
    fileInputRef.current.click();
  };

  const handleOpenImage = () => {
    if (image) {
      const newWindow = window.open();
      newWindow.document.write(
        `<img src="${image}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`
      );
    }
  };

  const handleResetImage = () => {
    setImage(null);
    setImageFile(null);
    fileInputRef.current.value = "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newPostData = { ...thisPost, [name]: value };
    setThisPost(newPostData);
  };

  const handleOnClick = async (event) => {
    event.preventDefault();

    const updatedPost = {
      title: document.getElementById("title")?.value ?? "",
      description: document.getElementById("description")?.value ?? "",
    };

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("country", country);

    for (const key in updatedPost) {
      formData.append(key, updatedPost[key]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        `${apiUrl}/view/posts/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Post updated successfully");
        setThisPost(updatedPost);
        router.back();
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post: ", error);
      alert("An error occurred while updating the post");
    }
  };

  return (
    <Layout>
      {thisPost && (
        <Box>
          <Typography className="flex justify-center home-title-text">
            EDIT POST
          </Typography>
          <Box className="flex mt-1 justify-center">
            <Typography className="create-title">COUNTRY</Typography>
            <StyledTextField
              id="country"
              className="create-input"
              select
              size="small"
              onChange={handleSelectChange}
              value={country}
            >
              {countries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledTextField>
          </Box>

          <Box className="flex mt-1 justify-center">
            <Typography className="create-title ">TITLE</Typography>
            <InputBase
              id="title"
              className="create-input"
              defaultValue={thisPost.post_title}
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
              defaultValue={thisPost.post_description}
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
                onClick={handleOnClick}
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
