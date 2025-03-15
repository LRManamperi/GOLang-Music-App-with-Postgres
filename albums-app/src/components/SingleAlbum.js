import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import { Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from '@mui/system';

// Styled components for enhanced styling
const CustomCard = styled(Card)({
  maxWidth: 600,
  margin: "auto",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
});

const TitleTextField = styled(TextField)({
  marginBottom: "15px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
});

const SingleAlbum = () => {
  const { id } = useParams(); // Get album ID from URL
  const [album, setAlbum] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedArtist, setUpdatedArtist] = useState("");
  const navigate = useNavigate(); // To redirect after delete/update

  useEffect(() => {
    // Fetch the album by ID
    axios
      .get(`http://localhost:8082/albums/${id}`)
      .then((response) => {
        setAlbum(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedArtist(response.data.artist);
      })
      .catch((error) => console.error("Error fetching album:", error));
  }, [id]);

  const handleDelete = () => {
    // Confirm delete action
    if (window.confirm(`Are you sure you want to delete the album "${album.title}"?`)) {
      axios
        .delete(`http://localhost:8082/albums/${id}`)
        .then(() => {
          alert("Album deleted successfully!");
          navigate("/"); // Redirect to the home page after deletion
        })
        .catch((error) => console.error("Error deleting album:", error));
    }
  };

  const handleUpdate = () => {
    const updatedAlbum = {
      ...album,
      title: updatedTitle,
      artist: updatedArtist,
    };

    axios
      .put(`http://localhost:8082/albums/${id}`, updatedAlbum)
      .then((response) => {
        setAlbum(response.data);
        alert("Album updated successfully!");
      })
      .catch((error) => console.error("Error updating album:", error));
  };

  const handleShare = () => {
    const shareData = {
      title: album.title,
      text: `${album.title} by ${album.artist}`,
      url: window.location.href, // Current page URL to share
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log("Album shared successfully!"))
        .catch((error) => console.error("Error sharing album:", error));
    } else {
      alert("Share not supported in your browser.");
    }
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundImage: "url(../bg.jpg)", // Set background image
        backgroundSize: "cover", // Ensure the image covers the whole background
        backgroundPosition: "center", // Center the image
        minHeight: "100vh", // Ensure full height of the screen is covered
      }}
    >
      <CustomCard>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {album.title}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Artist: {album.artist}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Price: ${album.price}
          </Typography>

          {/* Update Form */}
          <TitleTextField
            label="Update Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TitleTextField
            label="Update Artist"
            value={updatedArtist}
            onChange={(e) => setUpdatedArtist(e.target.value)}
            fullWidth
            variant="outlined"
          />

          {/* Buttons for Share, Update, and Delete */}
          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={handleShare} fullWidth>
              Share Album
            </Button>
            <Button variant="contained" color="secondary" onClick={handleUpdate} fullWidth>
              Update Album
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
              Delete Album
            </Button>
          </ButtonContainer>
        </CardContent>
      </CustomCard>
    </div>
  );
};

export default SingleAlbum;
