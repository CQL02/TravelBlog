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
  const { user, logoutUser } = useContext(UserContext);
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const response1 = await fetch(
        `${apiUrl}/auth/delete/${user?.user_id}`,
        {
          method: "DELETE",
        }
      );

      const response2 = await fetch(
        `${apiUrl}/auth/deleteDesc/${user?.user_id}`,
        {
          method: "DELETE",
        }
      );

      const response3 = await fetch(
        `${apiUrl}/auth/deleteAll/${user?.user_id}`,
        {
          method: "DELETE",
        }
      );

      if (response1.ok && response2.ok && response3.ok) {
        alert("Account deleted successfully");
        logoutUser();
        router.push("/login");
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error Deleting account: ", error);
      alert("An error occurred while deleting account");
    }
  };

  const showAlert = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      handleOnClick();
    }
  };

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
            onClick={() => {
              router.push("./changepassword");
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
            disabled
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
          <div className="flex-col m-[20px]">
            <Typography className="font-bold text-2xl">
              Delete Account
            </Typography>
            <Typography className="text-base">
              Are you sure you want to delete your account?
            </Typography>
            <Typography className="text-base text-red-700 mt-[10px] font-semibold">
              DANGER ZONE!
            </Typography>
            <Button
              size="small"
              className="bg-red-100 hover:bg-red-200 text-red-900"
              onClick={showAlert}
            >
              DELETE ACCOUNT
            </Button>
          </div>
        </Box>
      </Box>
    </Layout>
  );
}
