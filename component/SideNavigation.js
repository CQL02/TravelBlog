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
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SideNavigation() {
  const [state, setState] = useState(false);
  const toggleDrawer = () => {
    setState(!state);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/` }); // specify the callback URL to redirect to
    router.push("/"); // navigate programmatically to the home page
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
          src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
          style={{ width: "15em" }}
        />
        <Typography className="drawer-text" align="center">
          {session?.user?.email}
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

            <ListItemButton onClick={handleSignOut}>
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
