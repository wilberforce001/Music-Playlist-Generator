import React, { useState } from "react";
import GenreDropdown from "./components/GenreDropdown";
import GenerateButton from "./components/GenerateButton";
import PlaylistDisplay from "./components/PlaylistDisplay";
import axios from "axios";

const App = () => {
  const [genre, setGenre] = useState(""); // The genre tracks the currently selected genre from the dropdown
                                          // which initially is an empty string
  const [playlist, setPlaylist] = useState([]); // The playlist state stores the generated playlist as an array of songs
                                          // and is initially an empty array.  
  const genres = ["Pop", "Jazz", "Rock", "Hip-Hop", "Classical"]; // Hardcoded list of music genres passed to the GenreDropdown component for display

  // An asynchronus function that validates if a genre is selected, if not it shows an alert. 
  const fetchPlaylist = async () => {
    if (!genre) {
      alert("Please select a genre!");
      return;
    }
  // The function then sends a POST request to the backend with the selected genre as the payload
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-playlist", {
        genre,
      });
  // Updates the playlist state with the data returned by the server
      setPlaylist(response.data.playlist);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      alert("Failed to fetch playlist. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 className="text-center mb-4">Music Playlist Generator</h1>
      <div className="card p-4"> {/* Card groups the dropdown, button, and playlist display inside a styled card layout.   */}
        <GenreDropdown genres={genres} onchange={setGenre} /> {/* Child component that displays a dropdown with genre options 
        It uses the onChange prop to update the selected genre in the parent state */} 
        <GenerateButton onClick={fetchPlaylist} /> {/* Child component that triggers the fetchPlalist function on click */}
        <hr />
      </div>
      <PlaylistDisplay playlist={playlist} /> {/*The PlaylistDisplay displays the playlist or a fallback message if no songs are available */}
    </div>
  );
};

export default App;