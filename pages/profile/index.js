import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Grid from "@mui/material/Grid";
import CreateIcon from "@mui/icons-material/Create";
import Layout from "@/component/Layout";
import Chart from "@/component/Chart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/component/auth";
import { useRouter } from "next/router";
import apiUrl from "../api/apiConfig"

export default function FirstProfilePage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { userid } = router.query;
  const [userData, setUserData] = useState([]);
  const [userDesc, setUserDesc] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUserDesc = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/desc/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDesc(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchAvgRating = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/review/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserReview(data[0][0])

        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserDesc();
    fetchAvgRating();
  }, [userid]);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {userData && userData.user_image && (
        <Container maxWidth="md">
          <Box className="details" pt={4} pb={4} ml={3}>
            <Avatar
              src={convertBufferToBase64(userData.user_image)}
              className="userprofilepic"
              variant="square"
            />
            <Box ml={2}>
              <Typography variant="h5" fontWeight="bold">
                {userData.username}
              </Typography>

              <Box className="details">
                <LocationOnIcon color="primary" sx={{ fontSize: "20px" }} />
                <Typography variant="subtitle1" color="textSecondary">
                  {userDesc.user_country}
                </Typography>
              </Box>

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
                     {
                      userReview.rating ? parseFloat(userReview.rating).toFixed(1) : 0
                     } 
                    </Typography>
                    <Rating
                      name="rating"
                      size="large"
                      value={parseFloat(userReview.rating)}
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
              {parseInt(userid) === parseInt(user?.user_id) ? (
                <IconButton style={{ marginLeft: "auto" }} href="/settings">
                  <CreateIcon color="primary" />
                </IconButton>
              ) : (
                <></>
              )}
            </div>

            <Divider style={{ margin: "8px 0" }} />
            <Box className="ml-[25px] mr-[25px]">
              <Typography className="title-personal-details">
                Contact Information
              </Typography>

              <Box className="ml-[25px] mb-[15px]">
                <div className="details">
                  <Typography className="title">Phone:</Typography>
                  <Typography color="primary">{userDesc.user_phone}</Typography>
                </div>
                <div className="details">
                  <Typography className="title">E-mail:</Typography>
                  <Typography>{userData.user_email}</Typography>
                </div>
                <div className="details">
                  <Typography className="title">Instagram:</Typography>
                  <Typography>{userDesc.user_ig}</Typography>
                </div>
              </Box>

              <Typography className="title-personal-details">
                Travel Experiences
              </Typography>

              <Box className="ml-[25px] mb-[15px]">
                <div className="details">
                  <Typography className="title">Country：</Typography>
                  <Typography color="primary">
                    {userDesc.user_country_travelled}
                  </Typography>
                </div>
                <div className="details">
                  <Typography className="title">
                    Year of Experiences:
                  </Typography>
                  <Typography>{userDesc.user_yoe}</Typography>
                </div>
                <div className="details">
                  <Typography className="title">Skills:</Typography>
                  <Typography>{userDesc.user_skills}</Typography>
                </div>
              </Box>
            </Box>
          </Grid>

          {parseInt(userid) === parseInt(user?.user_id) ? (
            <>
              <Divider style={{ margin: "15px 0" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <InsertChartOutlinedIcon color="primary" sx={{ ml: "20px" }} />
                <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
                  Overview
                </Typography>
              </div>

              <Divider style={{ margin: "15px 0" }} />

              <Chart overallRate={userReview.rating ? parseFloat(userReview.rating).toFixed(1) : 0} />
            </>
          ) : (
            <></>
          )}
        </Container>
      )}
    </Layout>
  );
}
