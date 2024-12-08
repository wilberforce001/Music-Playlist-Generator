import React, { useState } from "react";
import GenreDropdown from "./components/GenreDropdown";
import GenerateButton from "./components/GenerateButton";
import PlaylistDisplay from "./components/PlaylistDisplay";
import axios from "axios";

const App = () => {
  const [genre, setGenre] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const genres = ["Pop", "Jazz", "Rock", "Hip-Hop", "Classical"];

  const fetchPlaylist = async () => {
    if (!genre) {
      alert("Please select a genre!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-playlist", {
        genre,
      });
      setPlaylist(response.data.playlist);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      alert("Failed to fetch playlist. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1 className="text-center mb-4">Music Playlist Generator</h1>
      <div className="card p-4">
        <GenreDropdown genres={genres} onchange={setGenre} />
        <GenerateButton onClick={fetchPlaylist} />
        <hr />
      </div>
      <PlaylistDisplay playlist={playlist} />
    </div>
  );
};

export default App;