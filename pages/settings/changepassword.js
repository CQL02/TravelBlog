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
import { useSession, signIn, signOut } from "next-auth/react";

import Layout from "../../component/Layout";

export default function SettingsChangePasswordPage() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({
    username: "failed",
    email: "failed@gmail.com",
    password: "failed",
    location: "failed, USA",
    job: "failed Blogger",
    rating: 4.5,
    phone: "failed",
    instagram: "aliabu_bin",
    travelCountry: "Malaysia, failed",
    yearOfExperience: "failed years",
    skills: "failed, Diving and Video Creating",
  });

  const [profilePic, setProfilePic] = useState(
    "/../public/images/Rectangle 176.png"
  );
  const fileInputRef = useRef(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleOnClick = (event) => {
    event.preventDefault();

    setOldPassword(document.getElementById("oldPassword").value);
    setNewPassword(document.getElementById("newPassword").value);
    setConfirmPassword(document.getElementById("confirmNewPassword").value);

    if (!(userData.password === document.getElementById("oldPassword").value)) {
      alert("Wrong old password, please enter again!");
      return;
    }

    if (document.getElementById("newPassword").value != "") {
      alert("New password cannot be empty!");
      return;
    }

    if (document.getElementById("confirmNewPassword").value != "") {
      alert("Confirm new password cannot be empty!");
      return;
    }

    if (
      !(
        document.getElementById("newPassword").value ===
        document.getElementById("confirmNewPassword").value
      )
    ) {
      alert("New password is not matched, please enter again!");
      return;
    }

    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    alert("New password is set");
  };

  const setPlaceHolder = () => {
    document.getElementById("username-name").placeholder = userData.username;
    document.getElementById("location").placeholder = userData.location;
    document.getElementById("job").placeholder = userData.job;
  };

  const router = useRouter();

  useEffect(() => {
    const fetchUSerData = async () => {
      try {
        const response = await axios.get("/profiledata.json");
        const data = response.data;
        const filterUser = data.filter(
          (user) => user.email === session.user.email
        );
        setUserData(filterUser[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUSerData();
    setPlaceHolder();
  });

  return (
    <Layout>
      <Box className="flex min-w-[230px] max-w-fit">
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
        <Box id="rightBox" className="flex">
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
          <Box id="profileBox" className="flex-col">
            <Box id="profileDetailContainerBox">
              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">USERNAME:</Typography>
                <input
                  disabled
                  id="username-name"
                  type="text"
                  name="username-name"
                  className="detailsInput"
                ></input>
              </Box>
              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">LOCATION:</Typography>
                <input
                  disabled
                  id="location"
                  type="text"
                  name="location"
                  className="detailsInput"
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">JOB:</Typography>
                <input
                  disabled
                  id="job"
                  type="text"
                  name="job"
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
