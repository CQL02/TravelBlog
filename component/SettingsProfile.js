import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Profile = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: 'fit-content',
                borderRadius: 1,
                bgcolor: 'background.paper',
                '& svg': {
                    m: 1.5,
                },
                '& hr': {
                    mx: 0.5,
                },
            }}>
            <Image
                className='profileImage'
                src='/../public/images/Rectangle 176.png'
                alt='Unable to load image'
                width={210}
                height={210}
            />
            <IconButton id='uploadProfile' aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCameraIcon fontsize="medium" />
            </IconButton>
            <Box marginLeft={2}>
                <Details text="USERNAME:" classname="profileDetails" textWidth={100} inputWidth={70} />
                <Details text="EMAIL:" classname="profileDetails" textWidth={100} inputWidth={70} />
                <Details text="COUNTRY:" classname="profileDetails" textWidth={100} inputWidth={70} />
            </Box>
        </Box>
    )
}

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

export default Profile