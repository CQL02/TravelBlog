import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FeedbackIcon from "@mui/icons-material/Feedback";

import Layout from "../../component/Layout";
import { DeleteForever } from "@mui/icons-material";
import apiUrl from "../api/apiConfig"

export default function SettingsFeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback || !subject) {
      setErrorMessage("Do not leave field empty!");
      return;
    } else {
      try {
        const response = await fetch(`${apiUrl}/email/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject: subject, text: feedback }),
        });

        if (response.ok) {
          setErrorMessage("");
          setFeedback("");
          setSubject("");
          alert("Your feedback is successfully sent!");
        } else {
          console.error("Failed to send verification email");
        }
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }
  };

  const router = useRouter();

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
            disabled
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
        <Box id="feedbackBox">
          <Typography id="emailTitle">SUBJECT:</Typography>
          <input
            id="emailInput"
            type="text"
            size={98}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          ></input>
          <Typography id="problemTitle">PROBLEMS FACED:</Typography>
          <textarea
            id="textarea"
            rows={8}
            cols={100}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          ></textarea>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Box>
            <Button
              id="submitButton"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Typography id="contactUs">
              CONTACT US AT: <br />
              travelnow@gmail.com <br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
