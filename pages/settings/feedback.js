import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FeedbackIcon from '@mui/icons-material/Feedback';

import Layout from "../../component/Layout";

export default function SettingsFeedbackPage() {

    const [feedback, setFeedback] = useState('')
    const [email, setEmail] = useState('')

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //Send data to database
        alert("Your feedback is successfully sent!")
        console.log("Email is"+ email)
        console.log("Feedback is " + feedback)
        setFeedback('');
        setEmail('');
    }
    
    const router = useRouter();

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
                    <Button onClick={() => {router.push("./")}} className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <EditIcon className="mr-[10px]" fontSize='medium' />
                        EDIT PROFILE
                    </Button>
                    <Button onClick={() => {router.push("./changepassword")}} className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <VpnKeyIcon className="mr-[10px]" fontSize='medium' />
                        CHANGE PASSWORD
                    </Button>
                    <Button disabled className="mr-auto navigationButton" variant="text" size="small" fullWidth>
                        <FeedbackIcon className="mr-[10px]" fontSize='medium' />
                        FEEDBACK
                    </Button>
                </Box>
                <Divider orientation='vertical' flexItem variant='middle' color='black' />
                <Box id="feedbackBox">
                    <Typography id="emailTitle">EMAIL:</Typography>
                    <input id="emailInput" type="text" size={98} value={email} onChange={handleEmailChange}></input>
                    <Typography id="problemTitle">PROBLEMS FACED:</Typography>
                    <textarea id="textarea" rows={8} cols={100} value={feedback} onChange={handleFeedbackChange}>
                    </textarea>
                    <Box>
                        <Button id="submitButton" variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Typography id='contactUs'>CONTACT US AT: <br />
                            xxx@gmail.com <br />
                            +60 123456789
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Layout >
    )
}