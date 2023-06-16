import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Layout from "../../component/Layout";
import { Avatar } from "@mui/material";
import { UserContext } from "@/component/auth";
import { DeleteForever } from "@mui/icons-material";
import apiUrl from "../api/apiConfig"

export default function SettingsChangePasswordPage() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userPass, setUserPass] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleOnClick = async (event) => {
    event.preventDefault();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      alert("Do not leave field blank");
      return;
    } else if (oldPassword !== userPass) {
      alert("Wrong old password, please enter again!");
      return;
    } else if (newPassword !== confirmPassword) {
      alert("New password is not matched, please enter again!");
      return;
    } else if (confirmPassword === userPass) {
      alert("New password cannot be same as old password!");
      return;
    } else {
      const requestData = {
        user_password: newPassword,
      };

      try {
        const response = await fetch(
          `${apiUrl}/users/updatePassword/${user?.user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          alert("New password is set");
          setUserPass(oldPassword);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error("Error changing password: ", error);
        alert("An error occurred while changing password");
      }
    }
  };

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${user?.user_id}`,
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
          setUserPass(data[0]?.user_password);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUserData();
  }, [user?.user_id]);

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
          <Button
            onClick={() => {
              router.push("./deleteAccount");
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
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          color="black"
        />
        <Box id="rightBox" className="flex">
          <Box id="imageBox" position="relative" display="inline-block">
            {profilePic && (
              <Avatar
                src={convertBufferToBase64(profilePic)}
                variant="square"
                sx={{ width: 210, height: 210 }}
              />
            )}
          </Box>
          <Box id="profileBox" className="flex-col">
            <Box id="profileDetailContainerBox">
              <Box className="profileDetailsBox" display="flex">
                <Typography className="details">USERNAME:</Typography>
                <input disabled className="detailsInput" value={username} />
              </Box>

              <Box className="profileDetailsBox mb-[50px]" display="flex">
                <Typography className="details">EMAIL:</Typography>
                <input disabled className="detailsInput" value={email} />
              </Box>
            </Box>

            <Box id="passwordBox">
              <Typography className="passwordLabel">
                *CURRENT PASSWORD
              </Typography>
              <input
                type="password"
                className="password"
                size={50}
                required
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
              <Typography className="passwordLabel">*NEW PASSWORD</Typography>
              <input
                type="password"
                className="password"
                size={50}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <Typography className="passwordLabel">
                *CONFIRM NEW PASSWORD
              </Typography>
              <input
                type="password"
                className="password"
                size={50}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
