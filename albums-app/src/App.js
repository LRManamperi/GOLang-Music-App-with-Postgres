import React from "react";
import AlbumList from "./components/AlbumList";
import AlbumForm from "./components/AlbumForm";
import Search from "./components/Search";
import { Container, Typography, Box, Paper, CssBaseline, Grid } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import bg from "./bg.jpg";
import logo from "./logo.png";
import Header from "./components/Header";

function App() {
  return (
    <>
      <CssBaseline /> {/* Normalize CSS */}
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Header />
        {/* Top Section: Logo and Search Bar */}
        <Container maxWidth="md" sx={{ mb: 4 }}
          >
          {/* <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            {/* Logo on the Right */}
            {/* <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "300px", height: "auto" }}
                />
              </Box>
            </Grid> */} 

            {/* Search Bar on the Left */}
              <Search />

        </Container>

        {/* Bottom Section: AlbumForm and AlbumList */}
        <Container
          maxWidth="md"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          {/* Form Section */}
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1.5rem",
              }}
            >
              <MusicNoteIcon sx={{ fontSize: "2rem" }} />
              Add a New Album
            </Typography>
            <AlbumForm />
          </Paper>
          </Container>
          {/* List Section */}
          <Container maxWidth="md"
            sx={{
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            padding: "20px",
          }}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1.5rem",
              }}
            >
              <MusicNoteIcon sx={{ fontSize: "2rem" }} />
              Your Albums
            </Typography>
            <AlbumList />
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#fff",
          }}
        >
          <Typography variant="body1">
            © 2025 Album Manager. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;