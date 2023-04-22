import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CreateIcon from "@mui/icons-material/Create";
import Layout from "@/component/Layout";
import Chart from "@/component/Chart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

const userData = [
  {
    username: "Josephine Marie",
    location: "Chicago, USA",
    job: "Travel Blogger",
    review: 4.0,
    phone: "012-3456789",
    email: "jpsephmarie@gmail.com",
    instagram: "@marieistravelling",
    travelCountry: "Malaysia, Cambodia, Thailand, Italy, England, Iceland",
    yearOfExperiences: "5 years",
    skills: "Photography, Video Creating, and Diving",
  },
];

export default function FirstProfilePage() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box className="details" pt={4} pb={4} ml={3}>
          <Avatar
            src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
            className="userprofilepic"
            variant="square"
          />
          <Box ml={2}>
            <Typography variant="h5" fontWeight="bold">
              {userData[0].username}
            </Typography>

            <Box className="details">
              <LocationOnIcon color="primary" sx={{ fontSize: "20px" }} />
              <Typography variant="subtitle1" color="textSecondary">
                {userData[0].location}
              </Typography>
            </Box>

            <Typography variant="subtitle1" color="#59ADD7">
              {userData[0].job}
            </Typography>
            <Box display="flex" alignItems="flex-end">
              <br />
              <div style={{ marginTop: "5px" }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Reviews
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    fontWeight="bold"
                  >
                    {userData[0].review.toFixed(1)}
                  </Typography>
                  <Rating
                    name="rating"
                    size="large"
                    value={userData[0].review}
                    precision={0.5}
                    readOnly
                    style={{ marginLeft: "8px", color: "#AED2E4" }}
                  />
                </Box>
              </div>
            </Box>
          </Box>
        </Box>

        <Divider style={{ margin: "8px 0" }} />

        <Grid item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PersonOutlineIcon color="primary" sx={{ ml: "20px" }} />
            <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
              About
            </Typography>
            <IconButton style={{ marginLeft: "auto" }}>
              <CreateIcon color="primary" />
            </IconButton>
          </div>

          <Divider style={{ margin: "8px 0" }} />
          <Box className="ml-[25px] mr-[25px]">
            <Typography className="title-personal-details">
              Contact Information
            </Typography>

            <Box className="ml-[25px] mb-[15px]">
              <div className="details">
                <Typography className="title">Phone:</Typography>
                <Typography color="primary">{userData[0].phone}</Typography>
              </div>
              <div className="details">
                <Typography className="title">E-mail:</Typography>
                <Typography>{userData[0].email}</Typography>
              </div>
              <div className="details">
                <Typography className="title">Instagram:</Typography>
                <Typography>{userData[0].instagram}</Typography>
              </div>
            </Box>

            <Typography className="title-personal-details">
              Travel Experiences
            </Typography>

            <Box className="ml-[25px] mb-[15px]">
              <div className="details">
                <Typography className="title">Country：</Typography>
                <Typography color="primary">
                  {userData[0].travelCountry}
                </Typography>
              </div>
              <div className="details">
                <Typography className="title">Year of Experiences:</Typography>
                <Typography>{userData[0].yearOfExperiences}</Typography>
              </div>
              <div className="details">
                <Typography className="title">Skills:</Typography>
                <Typography>{userData[0].skills}</Typography>
              </div>
            </Box>
          </Box>
        </Grid>

        <Divider style={{ margin: "15px 0" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <InsertChartOutlinedIcon color="primary" sx={{ ml: "20px" }} />
          <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
            Overview
          </Typography>
        </div>

        <Divider style={{ margin: "15px 0" }} />

        <Chart overallRate={userData[0].review.toFixed(1)} />
      </Container>
    </Layout>
  );
}
