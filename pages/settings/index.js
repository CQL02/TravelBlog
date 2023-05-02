import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import Layout from "../../component/Layout";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  // const [username, setUsername] = useState()
  // const [email, setEmail] = useState()
  // const [country, setCountry] = useState()
  // const [phone, setUsername] = useState()
  // const [instagram, setUsername] = useState()
  // const [yearofexperience, setUsername] = useState()
  // const [skills, setUsername] = useState()

  const [userData, setUserData] = useState([]);

  const [profilePic, setProfilePic] = useState(
    "/../public/images/Rectangle 176.png"
  );
  const fileInputRef = useRef(null);

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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
    console.log(userData);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    document.getElementById("username-name").value = userData.username;
    document.getElementById("email").value = userData.email;
    document.getElementById("country").value = userData.travelCountry;
    document.getElementById("phone").value = userData.phone;
    document.getElementById("instagram").value = userData.instagram;
    document.getElementById("yearofexperience").value = userData.yearOfExperience;
    document.getElementById("skills").value = userData.skills;
    alert("Data is updated" + JSON.stringify(userData));
    setUserData(userData);
  };

  const setValue = () => {
    document.getElementById("username-name").value = userData.username;
    document.getElementById("location").value = userData.location;
    document.getElementById("job").value = userData.job;
    document.getElementById("phone").value = userData.phone;
    document.getElementById("email").value = userData.email;
    document.getElementById("instagram").value = userData.instagram;
    document.getElementById("country").value = userData.travelCountry;
    document.getElementById("yearofexperience").value = userData.yearOfExperience;
    document.getElementById("skills").value = userData.skills;
  };

  const router = useRouter();

  useEffect(() => {

    if (session?.user) {
      const fetchUserData = async () => {
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
      fetchUserData();
      setValue();
      console.log("usedata", userData)
    }
    else {
      console.log("session undefined")
    }
  }, [session]);

  return (
    <Layout>
      <Box className="flex max-w-fit min-w-[230px]">
        <Box className="flex flex-col h-[88vh]">
          <Button
            disabled
            className="mr-auto navigationButton"
            variant="text"
            size="small"
            fullWidth
          >
            <EditIcon className="mr-[10px]" fontSize="medium" />
            EDIT PROFILE
          </Button>
          <Button
            onClick={() => {
              router.push("./settings/changepassword");
            }}
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
              router.push("./settings/feedback");
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
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box id="rightBox">
          <Box id="profileBox">
            <Box id="imageBox" position="relative" display="inline-block">
              <Image
                id="profileImage"
                src={profilePic}
                alt="Profile picture"
                width={210}
                height={210}
                style={{ objectFit: "cover" }}
              />

              <IconButton
                // onClick={handleUploadClick}
                id="uploadProfile"
                component="label"
              >
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

            <Box id="profileDetailContainerBox">
              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">USERNAME:</Typography>
                <input
                  id="username-name"
                  type="text"
                  name="username"
                  className="detailsInput"
                  onChange={handleOnChange}
                  value = {userData.username}
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">LOCATION:</Typography>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="detailsInput"
                  onChange={handleOnChange}
                  value = {userData.location}
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">JOB:</Typography>
                <input
                  id="job"
                  type="text"
                  name="job"
                  className="detailsInput"
                  onChange={handleOnChange}
                  value = {userData.job}
                ></input>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box id="aboutBox" className="flex align-center">
              <PersonOutlineIcon fontSize="medium" />
              <Typography className="ml-[5px]" display="inline">
                About
              </Typography>
            </Box>

            <Divider />

            <Box className="aboutDetailsBox">
              <Typography display="block" className="title">
                Contact Information
              </Typography>
              <Box className="flex my-[5px]">
                <Typography className="contactDetails" width={150}>
                  Phone
                </Typography>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  className="input"
                  onChange={handleOnChange}
                  value = {userData.phone}
                />
              </Box>
              <Box className="flex my-[5px]">
                <Typography className="contactDetails" width={150}>
                  Email
                </Typography>
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="input"
                  onChange={handleOnChange}
                  value = {userData.email}
                />
              </Box>
              <Box className="flex my-[5px]">
                <Typography className="contactDetails" width={150}>
                  Instagram
                </Typography>
                <input
                  id="instagram"
                  type="text"
                  name="instagram"
                  className="input"
                  onChange={handleOnChange}
                  value = {userData.instagram}
                />
              </Box>
            </Box>

            <Box className="aboutDetailsBox">
              <Typography display="block" className="title">
                Travel Experience
              </Typography>
              <Box className="flex my-[5px]">
                <Typography className="travelDetails" width={150}>
                  Country
                </Typography>
                <input
                  id="country"
                  type="text"
                  name="travelCountry"
                  className="input"
                  size={30}
                  onChange={handleOnChange}
                  value = {userData.travelCountry}
                />
              </Box>
              <Box className="flex my-[5px]">
                <Typography className="travelDetails" width={150}>
                  Year of Experience
                </Typography>
                <input
                  id="yearofexperience"
                  type="text"
                  name="yearOfExperience"
                  className="input"
                  size={30}
                  onChange={handleOnChange}
                  value = {userData.yearOfExperience}
                />
              </Box>
              <Box className="flex my-[5px]">
                <Typography className="travelDetails" width={150}>
                  Skills
                </Typography>
                <input
                  id="skills"
                  type="text"
                  name="skills"
                  className="input"
                  size={30}
                  onChange={handleOnChange}
                  value = {userData.skills}
                />
              </Box>
            </Box>

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
    </Layout>
  );
}
