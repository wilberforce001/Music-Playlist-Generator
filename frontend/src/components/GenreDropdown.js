import React from "react";

const GenreDropdown = ({ genres, onchange }) => {
    // The genres prop is an array of genre strings passed into the Component
    // that will populate the dropdown options
    // The onchange also passed as a prop to the component is called whenever the selected
    // selected option in the dropdown changes. It receives the value of the selected genre.
    return (
        <div className="d-flex justify-content-center mb-4">
            <select className="form-select w-auto me-3" onChange={(e) => onchange(e.target.value)}>
                {/* The <select> element is used to create the dropdown. 
                - form-select - to style the dropdown according to Bootstrap's theme
                - w-auto - limits the width of the dropdown to its content
                - me-3 - adds a small margin to the right of spacing. 

                Then, when an option is selected by a user the onChange event triggers and
                the value of the selected option(e.target.value) is passed to the onChange function.  */}
                <option value="">Select Genre</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre.toLowerCase()}>
                        {genre}
                    </option>    
                // The genres array is mapped over, and for each genre, an <option> is 
                // created with:
                // - key - a unique identifier (in this case, the index of the item)
                // - value - the genre in lowercase for easier handling in logic (e.g,. API requests) 
                // content - the displayed genre name
                ))}
            </select>
        </div>
    );
};

export default GenreDropdown; // The component is exported to be imported and used in other parts of the application. 