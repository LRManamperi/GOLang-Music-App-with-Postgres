import React, { useEffect, useState } from "react";
import axios from "axios";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
  .get("http://localhost:8082/albums")
  .then((response) => {
    console.log(response.data); // Log the response to debug
    setAlbums(response.data);  // Set the state with the fetched data
  })
  .catch((error) => console.error("Error fetching albums:", error));

  }, []);

  return (
    <div>
      <h2>Album List</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <strong>{album.title}</strong> by {album.artist} (${album.price})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
