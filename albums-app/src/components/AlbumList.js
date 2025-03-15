import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 3 albums per page
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    axios
      .get("http://localhost:8082/albums")
      .then((response) => {
        console.log(response.data);
        setAlbums(response.data);
      })
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(albums.length / itemsPerPage);

  // Get albums for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

  // Function to navigate to SingleAlbum page when album card is clicked
  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: 4 }}>
        Album List
      </Typography>
      
      {/* Album Cards */}
      <Grid container spacing={3}>
        {currentAlbums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
              onClick={() => handleAlbumClick(album.id)} // Handle album card click
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {album.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  by {album.artist}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${album.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="black"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          sx={{ mx: 1 }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ mx: 2, display: "flex", alignItems: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="red"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          sx={{ mx: 1 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default AlbumList;
