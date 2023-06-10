import React from "react";
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
import { useState, useContext } from "react";
import { Close } from "@mui/icons-material";
import { UserContext } from "./auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SideNavigation() {
  const router = useRouter();
  const { user, logoutUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [state, setState] = useState(false);
  const toggleDrawer = () => {
    setState(!state);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const handleCreateBlog = () => {
    router.push("/create");
    setState(false);
  };

  const handleSettings = () => {
    router.push("/settings");
    setState(false);
  };

  return (
    <Box>
      <IconButton className="headerButton" size="small" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <IconButton
          style={{ marginLeft: "auto", marginRight: "auto" }}
          onClick={() => setState(false)}
        >
          <Close />
        </IconButton>
        <div className="drawer-border">
          <Typography className="drawer-text" align="center">
            WELCOME
          </Typography>
          <Typography className="drawer-text-3" align="center">
            to
          </Typography>
          <Typography className="drawer-text" align="center">
            TRAVEL NOW!
          </Typography>
        </div>

        {user && (
          <Typography className="drawer-text-2" align="center">
            {user.username}
          </Typography>
        )}
        <Box className="drawer">
          <List>
            <ListItemButton onClick={handleCreateBlog}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Create Blog" />
            </ListItemButton>

            <ListItemButton onClick={handleSettings}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton onClick={handleLogout}>
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
