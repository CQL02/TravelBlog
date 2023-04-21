import Layout from "../../component/Layout";
import { IconButton, Button, Box, Avatar, Typography } from "@mui/material";
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonIcon from "@mui/icons-material/Person";
import { CenterFocusStrongRounded, DeleteOutline, EditOutlined } from "@mui/icons-material";
import Dialog from "@/component/deleteModal";


export default function viewPostsPage(){

    //load data
    const [data, setData] = useState(null);
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
      });
      const idProductRef = useRef();
      const handleDialog = (message, isLoading) => {
        setDialog({
          message,
          isLoading,
        });
      };
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/postdata.json");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  
    if (!data) {
      return <div>Loading data...</div>;
    }

    //ensure the posts are posted from same person
    const sorted = data.filter(checkUsername);
    function checkUsername(data){
        return data.username === "alibinabu";
    }

      const handleDelete = (id) => {  
        handleDialog("Are you sure you want to delete this post?", true, );
      };
    
      const areUSureDelete = (choose) => {
        if (choose) {
          setProducts(products.filter((p) => p.id !== idProductRef.current));
          handleDialog("", false);
        } else {
          handleDialog("", false);
        }
      };

    return(
      <Layout>
        <div className="avatar-container">
          <Avatar alt="alibinabu" src="https://th.bing.com/th/id/OIP.WlUDXSME4D1KBxKlZEtVuwHaKA?pid=ImgDet&rs=1" sx={{ width: 80, height: 80, marginTop: 3}}/>
          </div>
          <Typography className="username">alibinabu</Typography>
          <Typography className="description">
              Alibinabu is a software engineering who likes to travel around the world
              </Typography>
              {sorted.map((data) => (
            <Box className="search-country-box" key={data.id}>
    `           <img
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" style={{ width: "250px", height: "141px", borderRadius: "10px" }}
                />
                <Box key={data.id}>
                    <Typography className="search-country-country-text">
                    {data.country}
                    <IconButton className="editBtn" size="small">
                            <EditOutlined/>
                        </IconButton>
                        <IconButton className="deleteBtn"  size="small" onClick={() => handleDelete(data.id)}>
                            <DeleteOutline/>                       
                        </IconButton>
                    </Typography>

                    <Typography className="search-country-title-text">{data.title}</Typography>

                    <Box className="search-country-helper-text-box">
                    <Typography className="search-country-helper-text">
                        <PersonIcon className="search-country-icon" />
                        {data.username+"\t"}
                    </Typography>
                    <Typography className="search-country-helper-text">{data.date}</Typography>
                    </Box>

                    <Box className="search-country-helper-text-box">
                    <Typography className="search-country-helper-text">
                        <FavoriteIcon className="search-country-icon" />
                        {data.like + "\t"}
                    </Typography>
                    <Typography className="search-country-helper-text">
                        <RemoveRedEyeIcon className="search-country-icon" />
                        {data.view + " "}
                    </Typography>
                    <Typography className="search-country-helper-text">
                        <StarRateIcon className="search-country-icon" />
                        {data.rating + " "}
                    </Typography>
                    </Box>
                </Box>
            </Box>
            ))}
            {dialog.isLoading && (
            <Dialog
            onDialog={areUSureDelete}
            message={dialog.message}
            />
            )}
        </Layout>      

    );
    
}