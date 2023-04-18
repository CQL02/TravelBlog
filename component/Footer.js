import { Box, Divider, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function footer() {
  return (
    <Box className="footer-box">
      <Divider />
      <Typography align="center" className="footer">
        Copyright <CopyrightIcon className="footer" /> TRAVEL NOW. All Rights
        Reserved.
      </Typography>
    </Box>
  );
}
