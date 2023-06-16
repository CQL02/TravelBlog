import Layout from "@/component/Layout";
import {
  Box,
  Button,
  Chip,
  InputBase,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState, useRef, useContext } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/router";
import { UserContext } from "@/component/auth";
import apiUrl from '../api/apiConfig'

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

export default function createIndex() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [getTitle, setGetTitle] = useState("");
  const handleTitle = (event) => {
    setGetTitle(event.target.value);
  };

  const [getSelectedCountry, setGetSelectedCountry] = useState("");
  const handleSelectChange = (event) => {
    setGetSelectedCountry(event.target.value);
  };

  const [getDescription, setGetDescription] = useState("");
  const handleDescription = (event) => {
    setGetDescription(event.target.value);
  };

  const fileInputRef = useRef();

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file || !(file instanceof Blob)) {
      console.error("Invalid file selected");
      return;
    }
    setImage(file);
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
    fileInputRef.current.value = "";
  }

  const onPostClick = async () => {
    const fd = new FormData();
    fd.append("user_id", user?.user_id);
    fd.append("title", getTitle);
    fd.append("image", image);
    fd.append("description", getDescription);
    fd.append("country", getSelectedCountry);

    try {
      const response = await fetch(`${apiUrl}/view/add`, {
        method: "POST",
        body: fd,
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json.image);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      router.back();
    }
  };

  return (
    <Layout>
      <Typography className="flex justify-center home-title-text">
        CREATE POST
      </Typography>
      <Box className="flex mt-1 justify-center">
        <Typography className="create-title">COUNTRY</Typography>
        <StyledTextField
          className="create-input"
          select
          size="small"
          value={getSelectedCountry}
          onChange={handleSelectChange}
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
        <StyledTextField
          className="create-input"
          size="small"
          value={getTitle}
          onChange={(title) => handleTitle(title)}
        />
      </Box>

      <Box className="w-[600px] ml-auto mr-auto">
        <InputBase
          className="create-input-description"
          multiline
          rows={10}
          fullWidth
          value={getDescription}
          onChange={(description) => handleDescription(description)}
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
            onClick={() => onPostClick()}
          >
            POST
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
    </Layout>
  );
}
