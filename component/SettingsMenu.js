import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Menu = () => {
    return (
        <Paper sx={{ width: 400, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <EditIcon fontSize='medium' className='menuIcons' />
                    </ListItemIcon>
                    <ListItemText>EDIT PROFILE</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <VpnKeyIcon fontSize='medium' className='menuIcons' />
                    </ListItemIcon>
                    <ListItemText>CHANGE PASSWORD</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <FeedbackIcon fontSize='medium' className='menuIcons' />
                    </ListItemIcon>
                    <ListItemText>FEEDBACK</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    )
}

export default Menu