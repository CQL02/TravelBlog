import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Profile from './SettingsProfile'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Feedback = () => {
    return (
        <Box>
            <Typography id="emailTitle">EMAIL:</Typography>
            <input id="emailInput" type="text" size={98}></input>
            <Typography id="problemTitle">PROBLEMS FACED:</Typography>
            <textarea id="textarea" rows={8} cols={100}> 
            </textarea>
            <br/>
            <Button id="submitButton" variant="contained">
                Submit
            </Button>
            <Typography id='contactUs'>CONTACT US AT: <br />
                xxx@gmail.com <br />
                +60 123456789
            </Typography>
        </Box>
    )
}

export default Feedback