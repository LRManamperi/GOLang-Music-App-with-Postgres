import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/albums")
      .then((response) => {
        console.log(response.data); // Log the response to debug
        setAlbums(response.data); // Set the state with the fetched data
      })
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // Update filtered albums whenever searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = albums.filter((album) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAlbums(filtered);
    } else {
      setFilteredAlbums([]); // Clear suggestions if search query is empty
    }
  }, [searchQuery, albums]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }} width="100%">
        <Typography variant="h4" align="center" gutterBottom>
          <MusicNoteIcon sx={{ fontSize: "2rem", verticalAlign: "middle", mr: 1 }} />
          Your Albums
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mb: 4, position: "relative" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Albums"
            placeholder="Enter album title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <MusicNoteIcon sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          {/* Search Suggestions */}
          {filteredAlbums.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                width: "100%",
                zIndex: 1,
                maxHeight: "200px",
                overflowY: "auto",
                mt: 1,
              }}
            >
              <List>
                {filteredAlbums.map((album) => (
                  <ListItem
                    key={album.id}
                    button
                    onClick={() => {
                      setSearchQuery(album.title); // Auto-fill search bar with selected album
                      setFilteredAlbums([]); // Clear suggestions
                    }}
                  >
                    <ListItemText
                      primary={album.title}
                      secondary={`by ${album.artist} - $${album.price}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AlbumList;