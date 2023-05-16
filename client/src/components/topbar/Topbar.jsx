// import the necessary styling for the Topbar component
import "./topbar.css";

// import the necessary icons from Material-UI
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

// import the necessary context and router functions
import { useContext } from "react";
import { Link } from "react-router-dom";

// import the AuthContext to access the user's information
import { AuthContext } from "../../context/AuthContext";

// define the Topbar component
export default function Topbar() {
  
  // useContext hook allows us to use the value of AuthContext. In this case, we're extracting the user object
  const { user } = useContext(AuthContext);

  // define the public folder path
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // return the component JSX
  return (
  
    // topbarContainer is the wrapper class for the topbar
    <div className="topbarContainer">
    
      {/* // topbarLeft contains the logo which redirects to the homepage */}
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">The Digital Lab</span>
        </Link>
      </div>
      
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      
      <div className="topbarRight">
      
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        
        {/* // notifications section */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        
        {/* // user's profile picture that links to the user's profile page
        // if the user has a profile picture, it is displayed. Otherwise, a default image is used */}
        <Link to={`/profile/${user.username}`}>
          <img src={ user.profilePicture ? PF + user.profilePicture : `${PF}person/noAvatar.png`} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
