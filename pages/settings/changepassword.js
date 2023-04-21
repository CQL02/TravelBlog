import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import Layout from "../../component/Layout";

export default function SettingsChangePasswordPage() {
  const [userData, setUserData] = useState({
    username: "abcdefg",
    email: "example@gmail.com",
    country: "Malaysia",
    phone: "012-3456789",
    instagram: "instaexample",
    yearOfExperience: "10 years",
    skills: "diving, playing, jogging",
    profilePic: "/../public/images/Rectangle 176.png",
  });

  const [profilePic, setProfilePic] = useState(userData.profilePic);
  const fileInputRef = useRef(null);

  const [userPassword, setUserPassword] = useState("123456");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setProfilePic(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  const checkIfCurrentPasswordMatched = () => {
    return userPassword === oldPassword;
  };

  const checkIfNewPasswordMatched = () => {
    return newPassword === confirmPassword;
  };

  const handleOnClick = (event) => {
    event.preventDefault();

    setOldPassword(document.getElementById("oldPassword").value);
    setNewPassword(document.getElementById("newPassword").value);
    setConfirmPassword(document.getElementById("confirmNewPassword").value);

    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    if (!checkIfCurrentPasswordMatched()) {
      alert("Wrong old password, please enter again!");
      return;
    }

    if (!checkIfNewPasswordMatched()) {
      alert("New password is not matched, please enter again!");
      return;
    }

    alert("New password is set");
  };

  const setPlaceHolder = () => {
    document.getElementById("username").placeholder = userData.username;
    document.getElementById("email").placeholder = userData.email;
    document.getElementById("country").placeholder = userData.country;
  };

  const router = useRouter();

  useEffect(() => {
    const fetchUSerData = async () => {
      try {
        const response = await axios.get("/userdata.json");
        setUserData(response.data);
        const password = await axios.get("/credential.json");
        setUserPassword(password.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUSerData();
    setPlaceHolder();
  });

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          minWidth: 230,
          maxWidth: "fit-content",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "88vh",
          }}
        >
          <Button
            onClick={() => {
              router.push("./");
            }}
            className="mr-auto navigationButton"
            variant="text"
            size="small"
            fullWidth
          >
            <EditIcon className="mr-[10px]" fontSize="medium" />
            EDIT PROFILE
          </Button>
          <Button
            disabled
            className="mr-auto navigationButton"
            variant="text"
            size="small"
            fullWidth
          >
            <VpnKeyIcon className="mr-[10px]" fontSize="medium" />
            CHANGE PASSWORD
          </Button>
          <Button
            onClick={() => {
              router.push("./feedback");
            }}
            className="mr-auto navigationButton"
            variant="text"
            size="small"
            fullWidth
          >
            <FeedbackIcon className="mr-[10px]" fontSize="medium" />
            FEEDBACK
          </Button>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          color="black"
        />
        <Box
          id="rightBox"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box id="imageBox" position="relative" display="inline-block">
            <Image
              id="profileImage"
              src={profilePic}
              alt="Profile picture"
              width={210}
              height={210}
              style={{ objectFit: "cover" }}
            />

            <IconButton id="uploadProfile" component="label">
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
                accept="image/*"
                type="file"
              />
              <PhotoCameraIcon fontSize="medium" />
            </IconButton>
          </Box>
          <Box
            id="profileBox"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box id="profileDetailContainerBox">
              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">USERNAME:</Typography>
                <input
                  disabled
                  id="username"
                  type="text"
                  name="username"
                  className="detailsInput"
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">EMAIL:</Typography>
                <input
                  disabled
                  id="email"
                  type="text"
                  name="email"
                  className="detailsInput"
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">COUNTRY:</Typography>
                <input
                  disabled
                  id="country"
                  type="text"
                  name="country"
                  className="detailsInput"
                ></input>
              </Box>
            </Box>

            <Box id="passwordBox">
              <Typography className="passwordLabel">
                *CURRENT PASSWORD
              </Typography>
              <input
                id="oldPassword"
                type="password"
                className="password"
                size={50}
                required
              ></input>
              <Typography className="passwordLabel">*NEW PASSWORD</Typography>
              <input
                id="newPassword"
                type="password"
                className="password"
                size={50}
                required
              ></input>
              <Typography className="passwordLabel">
                *CONFIRM NEW PASSWORD
              </Typography>
              <input
                id="confirmNewPassword"
                type="password"
                className="password"
                size={50}
                required
              ></input>
              <Button
                onClick={handleOnClick}
                id="saveButton"
                variant="contained"
                size="small"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
