import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlbumList from "../src/components/AlbumList";
import SingleAlbum from "../src/components/SingleAlbum";
import Home from "../src/components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<SingleAlbum />} />
      </Routes>
    </Router>
  );
};

export default App;
