import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Details = ({ text, classname, textWidth, inputWidth }) => {
    return (
        <Stack
            direction='row'
            sx={{
                pt: 1.5
            }}>
            <Typography
                className={classname} width={textWidth}>{text}</Typography>
            <input type="text" className="input" size={inputWidth}></input>
        </Stack >
    )
}

const About = () => {
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonOutlineIcon fontsize='medium' />
                <Typography display="inline" >About</Typography>
            </Box>
            <Divider />
            <Box>
                <Typography display="block" className="title">Contact Information</Typography>
                <Details text="Phone" classname="contactDetails" textWidth={150} inputWidth={30} />
                <Details text="Email" classname="contactDetails" textWidth={150} inputWidth={30} />
                <Details text="Instagram" classname="contactDetails" textWidth={150} inputWidth={30} />
            </Box>
            <Box>
                <br />
                <Typography display="block" className='title'>Travel Experience</Typography>
                <Details text="Country" classname="travelDetails" textWidth={150} inputWidth={70} />
                <Details text="Year of Experience" classname="travelDetails" textWidth={150} inputWidth={70} />
                <Details text="Skills" classname="travelDetails" textWidth={150} inputWidth={70} />
            </Box>
            <Button id="saveButton" variant="contained">
                Save
            </Button>
        </div>

    )
}

export default About