import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, Box, TextField, Button, Grid } from "@mui/material";

const AlbumForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/albums", {
        ...formData,
        price: parseFloat(formData.price),
      })
      .then(() => {
        alert("Album added successfully!");
        setFormData({ title: "", artist: "", price: "" });
      })
      .catch((error) => {
        console.error("Error adding album:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Album
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} alignItems="center">
            {/* Title Field */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                placeholder="Enter album title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Artist Field */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Artist"
                name="artist"
                placeholder="Enter artist name"
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Price Field */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                placeholder="Enter album price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, height: "56px" }} // Adjust height to match TextField
              >
                Add Album
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AlbumForm;