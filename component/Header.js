import { Box, Button, Paper, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SignpostIcon from "@mui/icons-material/Signpost";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SideNav from "./SideNavigation";

export default function Header() {
  return (
    <Box sx={{ display: "flex", boxShadow: 3 }}>
      <SideNav />
      <Typography m={1}>TRAVEL NOW</Typography>

      <Paper component="form" className="headerSearchBox">
        <SearchIcon />
        <InputBase />
      </Paper>

      <Box sx={{ marginLeft: "auto" }}>
        <Button variant="text" size="small" className="headerButton">
          <HomeIcon />
          HOME
        </Button>
        <Button variant="text" size="small" className="headerButton">
          <PublicIcon />
          COUNTRY
        </Button>
        <Button variant="text" size="small" className="headerButton">
          <SignpostIcon />
          MY BLOG
        </Button>
        <Button variant="text" size="small" className="headerButton">
          <PersonIcon />
          PROFILE
        </Button>
      </Box>
    </Box>
  );
}
