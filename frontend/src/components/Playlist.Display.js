import React from "react";

const PlaylistDisplay = ({ playlist }) => {
    // The PlaylistDisplay React component renders a list of songs as a playlist
    // It takes a playlist prop and dynamically displays the list of songs or a fallback
    // message if no songs are available
    const itemStyle = {
        // itemStyle: an object defining inline CSS for each playlist item
        backgroundColor: "#ffffff",
        padding: "15px",
        margin: "5px 0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div>
            <h2>Playlist</h2>
            <ul className="list-group" style={{ listStyleType: "none", padding: 0 }}>
                {playlist.length === 0 ? (
                    <li style={itemStyle}>No songs generated.</li>
                    // If playlist is empty (length === 0), a "No songs generated" message is displayed
                    // Otherwise, it maps over the playlist array and created a <li> element for each song
                ) : (
                    playlist.map((song, index) => (
                        <li key={index} style={itemStyle}>
                            <strong>{song.title}</strong> by {song.artist}
                        </li>
                    // The playlist prop is passed as an array of song objects to the component
                    // and each object is expected to have:
                    // - title: the title of the song
                    // - artist: the name of the artist
                    ))
                )}
            </ul>
        </div>
    );
};

export default PlaylistDisplay; // The PlaylistDisplay component is exported for use in other parts of the application.