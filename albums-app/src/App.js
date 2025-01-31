import React from "react";
import AlbumList from "./components/AlbumList";
import AlbumForm from "./components/AlbumForm";
import Search from "./components/Search";
import { Container, Typography, Box, Paper, CssBaseline } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // Correct import
import bg from "./bg.jpg";

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
          justifyContent: "center",
        }}
      >
       <Container
        maxWidth="md"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#f9f9f9",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          marginTop: "30px",
          marginBottom: "30px",
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        }}
      >
        {/* search */} 
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#fff",
          }}
        >
          <MusicNoteIcon sx={{ fontSize: "4rem", color: "#fff" }} /> {/* Correct icon usage */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              marginBottom: "10px",
              color: "#fff",
            }}
          >
            Search Albums
          </Typography>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Find your favorite music
          </Typography>
        </Box>
        <Search />
        </Container>
      <Container
        maxWidth="md"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#f9f9f9",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          marginTop: "30px",
          marginBottom: "30px",
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#fff",
          }}
        >
          <MusicNoteIcon sx={{ fontSize: "4rem", color: "#fff" }} /> {/* Correct icon usage */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              marginBottom: "10px",
              color: "#fff",
            }}
          >
            Albums Management
          </Typography>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Effortlessly manage your music collection
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Form Section */}
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
              <MusicNoteIcon sx={{ fontSize: "2rem" }} /> {/* Correct icon usage */}
              Add a New Album
            </Typography>
            <AlbumForm />
          </Paper>

          {/* List Section */}
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
              <MusicNoteIcon sx={{ fontSize: "2rem" }} /> {/* Correct icon usage */}
              Your Albums
            </Typography>
            <AlbumList />
          </Paper>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography variant="body1" sx={{ color: "#fff" }}>
            © 2025 Album Manager. All rights reserved.
          </Typography>
        </Box>
      </Container>
      </Box>
    </>
  );
}

export default App;