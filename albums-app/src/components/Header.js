import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../logo.png";
import LoginPopup from "./login";
import SignupPopup from "./signup";

function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "rgba(155, 53, 53, 0.9)", boxShadow: 3 }}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ width: "150px", height: "auto" }} />
          </Box>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 24, fontWeight: 600, textAlign: "center" }}>
            Albums App
          </Typography>

          {/* Login & Sign Up Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>
            <Button variant="contained" color="black" onClick={() => setSignupOpen(true)}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popups */}
      <LoginPopup open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <SignupPopup open={signupOpen} handleClose={() => setSignupOpen(false)} />
    </>
  );
}

export default Header;
