import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText, Container } from "@mui/material";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/albums")
      .then((response) => {
        console.log(response.data); // Log the response to debug
        setAlbums(response.data); // Set the state with the fetched data
      })
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: 4 }}>
        Album List
      </Typography>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
    </Container>
  );
};

export default AlbumList;