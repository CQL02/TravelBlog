import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState, useEffect } from "react";

export default function SideNavigation() {
  const [state, setState] = useState(false);
  const toggleDrawer = () => {
    setState(!state);
  };

  return (
    <Box>
      <IconButton className="headerButton" size="small" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <Typography className="drawer-text" align="center">
          WELCOME!
        </Typography>
        <img
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          style={{ width: "15em" }}
        />
        <Typography className="drawer-text" align="center">
          username
        </Typography>
        <Box className="drawer">
          <List>
            <ListItemButton href="/create">
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Create Blog" />
            </ListItemButton>

            <ListItemButton href="/settings">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
