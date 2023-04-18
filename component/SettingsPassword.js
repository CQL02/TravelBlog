import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Profile from './SettingsProfile'
import Button from '@mui/material/Button';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const PassWordProfile = () => {
    return (
        <Box>
            <Profile />
            <Typography className="passwordLabel">*CURRENT PASSWORD</Typography>
            <input type="text" className="password" size={100}></input>
            <Typography className="passwordLabel">*NEW PASSWORD</Typography>
            <input type="text" className="password" size={100}></input>
            <Typography className="passwordLabel">*CONFIRM NEW PASSWORD</Typography>
            <input type="text" className="password" size={100}></input>
            <Button id="saveButton" variant="contained">
                Save
            </Button>
        </Box>
    )
}

export default PassWordProfile