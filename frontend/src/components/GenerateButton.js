import React from "react"; // Import React library into the file which is important
// for the transformation of JSX syntax into JavaScript function calls that reference React.createElement
// for instance, const element = <h1>Hello, world!</h1>; gets compiled into
// const element = React.createElement('h1', null, 'Hello, world!');

const GenerateButton = ({ onClick }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
        {/* d-flex - enables flexbox for the container, which makes items aligned and distributed
                    efficiently within a container.
            justify-content-center - centers the button horizontally within the div
            mb- adds a bottom margin to the div
        */}
      <button onClick={onClick} className="btn btn-primary"> {/*the button is rendered with the function to be executed specified when the 
      button is clicked 
      btn btn-primary - styles the button with primary colors
      */}
      Generate Playlist
        {/* Generate Playlist- Text to be displayed on the button */}
      </button>
    </div>
  );
};

export default GenerateButton; {/* export the component that will be imported and used in other files  */}
