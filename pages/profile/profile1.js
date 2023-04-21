import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';

export default function FirstProfilePage() {

    return (

        <main>
            <Container maxWidth="md">
                <Box className="details" pt={4} pb={4}>
                    <Avatar className="userprofilepic" variant="square">JM</Avatar>
                <Box ml={2}>
                <Typography variant="h5" fontWeight="bold">
                    Josephine Marie
                </Typography>
                <br />
                <Box className="details">
                    <LocationOnIcon color="primary" />
                    <Typography variant="subtitle1" color="textSecondary" ml={1}>
                        Chicago, USA
                    </Typography>
                </Box>
                <br />
                <Typography variant="subtitle1" color="lightblue">Travel Blogger</Typography>
                <Box display="flex" alignItems="flex-end">
                <br />
                <div>
                    <Typography variant="subtitle1" color="textSecondary">
                        Reviews
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h4" color="textPrimary">
                            4.0
                        </Typography>
                        <Rating name="rating" size="large" value={4.0} precision={0.1} readOnly style={{ marginLeft: '8px' }} />
                    </Box>
                </div>
                </Box>
                </Box>
                </Box>

            <Divider style={{ margin: '1rem 0' }} />


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Grid item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ImportContactsIcon color="primary" />
                        <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                            Blogs
                        </Typography>
                    </div>

                <Divider style={{ margin: '16px 0' }} />

                    <div>
                    <Box className="details" mt={2}>
                        <ListItem>
                            <Avatar clasName="blogpic" variant="square">P</Avatar>
                        </ListItem>
                        <ListItemText primary="Discover Malaysia" secondary="A country with multiculture" />
                    </Box>
                    <Box className="details" mt={2}>
                        <ListItem>
                            <Avatar clasName="blogpic" variant="square">P</Avatar>
                        </ListItem>
                        <ListItemText primary="Discover Malaysia" secondary="A country with multiculture" />
                    </Box>
                    <Box className="details" mt={2}>
                        <ListItem>
                            <Avatar clasName="blogpic" variant="square">P</Avatar>
                        </ListItem>
                        <ListItemText primary="Discover Malaysia" secondary="A country with multiculture" />
                    </Box>
                    </div>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PersonOutlineIcon color="primary" />
                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                        About
                    </Typography>
                    <CreateIcon color="primary" style={{ marginLeft: 'auto' }}/>
                    </div>

                <Divider style={{ margin: '16px 0' }} />
          
                <Typography className="title-personal-details">Contact Information</Typography>

                <div className="details">
                    <Typography className="title">
                        Phone:
                    </Typography>
                    <Typography className="description" color="primary">+012-3456789</Typography>
                </div>
                <div className="details">
                    <Typography className="title">
                        E-mail:
                    </Typography>
                    <Typography className="description">josephmarie@gmail.com</Typography>
                </div>
                <div className="details">
                    <Typography className="title">
                        Instagram:
                    </Typography>
                    <Typography className="description" >@marieistravelling</Typography>
                </div>
      <Typography className="title-personal-details">Travel Experiences</Typography>

                <div className="details">
                    <Typography className="title">
                        Country：
                    </Typography>
                    <Typography className="description" color="primary">
                        Malaysia, Cambodia, Thailand, Italy, England, Iceland
                    </Typography>
                </div>
                <div className="details">
                    <Typography className="title">
                        Year of Experiences:
                    </Typography>
                    <Typography className="description">5 years</Typography>
                </div>
                <div className="details">
                    <Typography className="title">
                        Skills:
                    </Typography>
                    <Typography className="description">
                        Photography, Video Creating, and Diving
                    </Typography>
                </div>

                </Grid>
                </Grid>
                </Grid>


            </Box>
            
            </Container>
        </main>
    
    );
}