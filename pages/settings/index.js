import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import Layout from "../../component/Layout";

export default function SettingsPage() {

    const [userData, setUserData] = useState({
        username: 'abcdefg',
        email: 'example@gmail.com',
        country: 'Malaysia',
        phone: "012-3456789",
        instagram: "instaexample",
        yearOfExperience: "10 years",
        skills: "diving, playing, jogging",
        profilePic: "/../public/images/Rectangle 176.png"
    });

    const [profilePic, setProfilePic] = useState(userData.profilePic);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                setProfilePic(reader.result);
            });

            reader.readAsDataURL(file);
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const newUserData = { ...userData, [name]: value }
        setUserData(newUserData)
        console.log(userData)
    }

    const handleOnClick = (event) => {
        event.preventDefault();

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("country").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("instagram").value = "";
        document.getElementById("yearofexperience").value = "";
        document.getElementById("skill").value = "";

        alert("Data is updated" + JSON.stringify(userData));
        console.log(userData)
        setUserData(userData);
    }

    const setPlaceHolder = () => {
        document.getElementById("username").placeholder = userData.username;
        document.getElementById("email").placeholder = userData.email;
        document.getElementById("country").placeholder = userData.country;
        document.getElementById("phone").placeholder = userData.phone;
        document.getElementById("instagram").placeholder = userData.instagram;
        document.getElementById("yearofexperience").placeholder = userData.yearOfExperience;
        document.getElementById("skill").placeholder = userData.skills;
    }

    const router = useRouter();

    useEffect(() => {
        const fetchUSerData = async () => {
            try {
                const response = await axios.get("/userdata.json");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchUSerData();
        setPlaceHolder();
    })

    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    minWidth: 230,
                    maxWidth: 'fit-content'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Button disabled className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <EditIcon className="mr-[10px]" fontSize='medium' />
                        EDIT PROFILE
                    </Button>
                    <Button onClick={() => {router.push("./settings/changepassword")}} className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <VpnKeyIcon className="mr-[10px]" fontSize='medium' />
                        CHANGE PASSWORD
                    </Button>
                    <Button onClick={() => {router.push("./settings/feedback")}} className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <FeedbackIcon className="mr-[10px]" fontSize='medium' />
                        FEEDBACK
                    </Button>
                </Box>
                <Divider orientation='vertical' flexItem variant='middle' color='black' />
                <Box id="rightBox">

                    <Box id="profileBox" >

                        <Box id="imageBox" position="relative" display="inline-block">
                            <Image
                                id='profileImage'
                                src={profilePic}
                                alt='Profile picture'
                                layout='responsive'
                                width={210}
                                height={210}
                            />

                            <IconButton onclick={handleUploadClick} id='uploadProfile' component="label">
                                <input ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" type="file" />
                                <PhotoCameraIcon fontsize="medium" />
                            </IconButton>

                        </Box>

                        <Box id="profileDetailContainerBox">

                            <Box className="profileDetailsBox" display='flex'>
                                <Typography
                                    className="details">USERNAME:</Typography>
                                <input id="username" type="text" name="username" className="detailsInput" onChange={handleOnChange}></input>
                            </Box>

                            <Box className="profileDetailsBox" display='flex'>
                                <Typography
                                    className="details">EMAIL:</Typography>
                                <input id="email" type="text" name="email" className="detailsInput" onChange={handleOnChange}></input>
                            </Box>

                            <Box className="profileDetailsBox" display='flex'>
                                <Typography
                                    className="details">COUNTRY:</Typography>
                                <input id="country" type="text" name="country" className="detailsInput" onChange={handleOnChange}></input>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Box id="aboutBox" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonOutlineIcon fontsize='medium' />
                            <Typography className="ml-[5px]" display="inline" >About</Typography>
                        </Box>

                        <Divider />

                        <Box className="aboutDetailsBox">
                            <Typography display="block" className="title">Contact Information</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '5px',
                                    mb: '5px'
                                }} >
                                <Typography
                                    className="contactDetails" width={150}>Phone</Typography>
                                <input id="phone" type="text" name="phone" className="input" ></input>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '5px',
                                    mb: '5px'
                                }} >
                                <Typography
                                    className="contactDetails" width={150}>Instagram</Typography>
                                <input id="instagram" type="text" name="instagram" className="input"></input>
                            </Box>
                        </Box>

                        <Box className="aboutDetailsBox">
                            <Typography display="block" className='title'>Travel Experience</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '5px',
                                    mb: '5px'
                                }} >
                                <Typography
                                    className="travelDetails" width={150}>Year of Experience</Typography>
                                <input id="yearofexperience" type="text" name="yearofexperience" className="input" size={30}></input>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mt: '5px',
                                    mb: '5px'
                                }} >
                                <Typography
                                    className="travelDetails" width={150}>Skills</Typography>
                                <input id="skill" type="text" name="skill" className="input" size={30}></input>
                            </Box>
                        </Box>

                        <Button onClick={handleOnClick} id="saveButton" variant="contained" size="small">
                            Save
                        </Button>

                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

