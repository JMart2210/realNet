// import the necessary styling for the Sidebar component
import "./sidebar.css";

// import the necessary icons from Material-UI
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

// import the Users data and the CloseFriend component
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

// define the Sidebar component
export default function Sidebar() {
  return (
  
    // the 'sidebar' class is the outermost wrapper for the sidebar
    <div className="sidebar">
    
      {/* // the 'sidebarWrapper' class is the inner wrapper for the sidebar */}
      <div className="sidebarWrapper">
      
        <ul className="sidebarList">
        
          {/* // each 'sidebarListItem' contains an icon and the corresponding text */}
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
        </ul>
        
        {/* // 'sidebarButton' is used to expand the sidebar and show more options */}
        <button className="sidebarButton">Show More</button>
        
        {/* // a horizontal rule for visual separation */}
        <hr className="sidebarHr" />
        
        {/* // 'sidebarFriendList' displays a list of friends */}
        <ul className="sidebarFriendList">
        
          {/* // iterate over the Users array and create a CloseFriend component for each user */}
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
          
        </ul>
      </div>
    </div>
  );
}
