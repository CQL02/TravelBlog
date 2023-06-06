import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SignpostIcon from "@mui/icons-material/Signpost";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SideNav from "./SideNavigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "./auth";

export default function Header() {
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push({
        pathname: "/home/search",
        query: { search: searchQuery },
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ display: "flex", boxShadow: 3 }}>
      <SideNav />
      <Typography
        m={1}
        pr={3}
        onClick={() => router.push("/home")}
        sx={{ cursor: "pointer" }}
      >
        TRAVEL NOW
      </Typography>

      <Paper component="form" className="headerSearchBox">
        <InputBase
          placeholder="Search…"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          startAdornment={<SearchIcon />}
          inputProps={{ "aria-label": "search" }}
        />
      </Paper>

      {isMobile ? (
        <Box sx={{ marginLeft: "auto" }}>
          <Link href="/home">
            <IconButton
              variant="text"
              size="small"
              sx={{ color: "black", mr: "10px" }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href="/country">
            <IconButton
              variant="text"
              size="small"
              sx={{ color: "black", mr: "10px" }}
            >
              <PublicIcon />
            </IconButton>
          </Link>

          <IconButton
            variant="text"
            size="small"
            sx={{ color: "black", mr: "10px" }}
            onClick={() => router.push(`/blog?userid=${user?.user_id}`)}
          >
            <SignpostIcon />
          </IconButton>

          <IconButton
            variant="text"
            size="small"
            sx={{ color: "black", mr: "10px" }}
            onClick={() => router.push(`/profile?userid=${user?.user_id}`)}
          >
            <PersonIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ marginLeft: "auto" }}>
          <Link href="/home">
            <Button variant="text" size="small" className="headerButton">
              <HomeIcon />
              HOME
            </Button>
          </Link>

          <Link href="/country">
            <Button variant="text" size="small" className="headerButton">
              <PublicIcon />
              COUNTRY
            </Button>
          </Link>

          <Button
            variant="text"
            size="small"
            className="headerButton"
            onClick={() => router.push(`/blog?userid=${user?.user_id}`)}
          >
            <SignpostIcon />
            MY BLOG
          </Button>

          <Button
            variant="text"
            size="small"
            className="headerButton"
            onClick={() => router.push(`/profile?userid=${user?.user_id}`)}
          >
            <PersonIcon />
            PROFILE
          </Button>
        </Box>
      )}
    </Box>
  );
}
