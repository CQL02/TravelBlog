import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LineGraph from "../../component/LineGraph";


export default function FirstProfilePage() {

    return (

        <main>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid item>
                    <Box className="details" mt={2}>
                        <ListItem>
                            <Avatar clasName="blogpic" variant="square">P</Avatar>
                        </ListItem>
                        <ListItemText primary="Discover Malaysia" secondary="A country with multiculture" />
                    </Box>
                    </Grid>
                </Grid>

                <Grid item xs={10}>
                    <Grid item>
                        <div className="details">
                            <Typography variant="h4" style={{ marginLeft: '8px' }}>
                                Overview
                            </Typography>
                        </div>

                        <Divider style={{ flex: '0 1 0', margin: '0 1rem' }} />

                        <Box 
                            border={1}
                            borderColor="blue"
                            minHeight="calc(90vh - 50px)"
                            padding={2}
                            marginTop={2}
                            boxShadow={2}
                            style={{ marginLeft: '4rem', marginRight: '4rem' }}
                        >
                        
                        <Grid container spacing={2}>
                        
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1" color="primary">Overall Rating</Typography>
                                <Box className="details">
                                    <Typography variant="h3" color="textPrimary">
                                        4.0
                                    </Typography>
                                    <Rating name="rating" size="large" value={4.0} precision={0.1} readOnly style={{ marginLeft: '8px' }} />
                                </Box>
                                <Typography variant="h5" color="lightgreen">+0.5<Typography ariant="subtitle1" color="textSecondary" component="span"> points from last month</Typography></Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="subtitle1" color="primary">Total Views</Typography>       
                                <Typography variant="h3" color="textPrimary">
                                        10.0K
                                </Typography>
                                <Typography variant="h5" color="lightgreen">+30%<Typography variant="subtitle1" color="textSecondary" component="span"> views from last month</Typography></Typography>
                            </Grid>

                            <Grid item xs={4}>
                            <Typography variant="subtitle1" color="primary">Total Comments</Typography>       
                                <Typography variant="h3" color="textPrimary">
                                        728
                                </Typography>
                                <Typography variant="h5" color="maroon">-10%<Typography variant="subtitle1"  color="textSecondary" component="span"> comments from last month</Typography></Typography>
                            </Grid>
                            </Grid>
                        </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" color="primary">Updated 13 April 2023, 8:50 p.m.</Typography>
                    <LineGraph />
                </Grid>
                </Grid>
                </Box>
                </Grid>
                </Grid>
                </Grid>
            </Box>
        </main>
    
    );
}