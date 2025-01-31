import React, { useState } from "react";
import axios from "axios";

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
    axios.post("http://localhost:8082/albums", {
      ...formData,
      price: parseFloat(formData.price),
    })
    .then(() => {
      alert("Album added successfully!");
      setFormData({title: "", artist: "", price: "" });
    })
    .catch((error) => {
      console.error("Error adding album:", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Album</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AlbumForm;
