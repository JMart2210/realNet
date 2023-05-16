// Import the necessary CSS for this component
import "./online.css";

// Define the Online component
export default function Online({user}) {
  // Define the path to the public folder from environment variables
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  // Render the component
  return (
    // Each online user is represented as an item in a list
    <li className="rightbarFriend">
      {/* // The user's profile picture is contained within a div */}
      <div className="rightbarProfileImgContainer">
        {/* // The image source is the concatenation of the public folder path and the user's profile picture file */}
        <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
        {/* // An online status indicator is shown for each user */}
        <span className="rightbarOnline"></span>
      </div>
      {/* // The user's username is displayed */}
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
