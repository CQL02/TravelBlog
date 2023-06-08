import { useState, useEffect, useRef, useContext } from "react";
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
import { Avatar } from "@mui/material";
import { UserContext } from "@/component/auth";
import { DeleteForever } from "@mui/icons-material";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yoe, setYoe] = useState("");
  const [skills, setSkills] = useState("");
  const [countryTravelled, setCountryTravelled] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef(null);

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleUploadClick = (event) => {
    const file = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setProfilePic(reader.result);
      });

      reader.readAsDataURL(file);
    }
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

  const handleOnClick = async (event) => {
    event.preventDefault();

    const imageData = profilePic.data;
    const imageBuffer = Buffer.from(imageData);
    const imageType = profilePic.type;
    const imageFileName = "profile_image";
    const imageFile = new File([imageBuffer], imageFileName, {
      type: imageType,
    });

    const formData1 = new FormData();
    formData1.append("username", username);
    formData1.append("email", email);
    formData1.append("image", imageFile);

    const formData2 = new FormData();
    formData2.append("country", country);
    formData2.append("phone", phone);
    formData2.append("instagram", instagram);
    formData2.append("country_travelled", countryTravelled);
    formData2.append("yoe", yoe);
    formData2.append("skills", skills);

    try {
      const response1 = await fetch(
        `http://localhost:8080/users/updateDetails/${user?.user_id}`,
        {
          method: "PUT",
          body: formData1,
        }
      );

      const response2 = await fetch(
        `http://localhost:8080/users/updateProfile/${user?.user_id}`,
        {
          method: "PUT",
          body: formData2,
        }
      );

      console.log(formData2.toString());
      if (response1.ok && response2.ok) {
        alert("Successfully Update");
        setUsername(username);
        setEmail(email);
        setProfilePic(profilePic);
        setCountry(country);
        setInstagram(instagram);
        setPhone(phone);
        setSkills(skills);
        setYoe(yoe);
        setCountryTravelled(countryTravelled);
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post: ", error);
      alert("An error occurred while updating the post");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${user?.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsername(data[0]?.username);
          setEmail(data[0]?.user_email);
          setProfilePic(data[0]?.user_image);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUserDesc = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/desc/${user?.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCountry(data[0]?.user_country);
          setInstagram(data[0]?.user_ig);
          setPhone(data[0]?.user_phone);
          setSkills(data[0]?.user_skills);
          setYoe(data[0]?.user_yoe);
          setCountryTravelled(data[0]?.user_country_travelled);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUserData();
    fetchUserDesc();
  }, [user?.user_id]);

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
          <Button
            onClick={() => {
              router.push("./settings/deleteAccount");
            }}
            className="mr-auto navigationButton"
            variant="text"
            size="small"
            fullWidth
          >
            <DeleteForever className="mr-[10px]" fontSize="medium" />
            DELETE ACCOUNT
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box id="rightBox">
          <Box id="profileBox">
            <Box id="imageBox" position="relative" display="inline-block">
              {profilePic && (
                <Avatar
                  id="profileImage"
                  src={convertBufferToBase64(profilePic)}
                  variant="square"
                  sx={{ width: 210, height: 210, objectFit: "cover" }}
                />
              )}

              <IconButton
                onClick={handleUploadClick}
                id="uploadProfile"
                component="label"
              >
                <input
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
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                ></input>
              </Box>

              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">LOCATION:</Typography>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="detailsInput"
                  onChange={(event) => setCountry(event.target.value)}
                  value={country}
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
                  onChange={(event) => setPhone(event.target.value)}
                  value={phone}
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
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
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
                  onChange={(event) => setInstagram(event.target.value)}
                  value={instagram}
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
                  onChange={(event) => setCountryTravelled(event.target.value)}
                  value={countryTravelled}
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
                  onChange={(event) => setYoe(event.target.value)}
                  value={yoe}
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
                  onChange={(event) => setSkills(event.target.value)}
                  value={skills}
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
