import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import logo from "../logo.png"; // Adjust the path if necessary

function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(155, 53, 53, 0.9)", boxShadow: 3 }}>
    <Toolbar>
      {/* Logo on the Left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "200px", height: "100px" }}
        />
      </Box>
      
      {/* Title in the Middle */}
        <Typography variant="h6" align="center" sx={{ flexGrow: 3 }} fontSize={34} fontWeight={600}>
            Albums App
        </Typography>
    </Toolbar>
    </AppBar>
  );
}

export default Header;
