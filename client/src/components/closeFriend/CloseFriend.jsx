// import the necessary styling for the CloseFriend component
import "./closeFriend.css";

// define the CloseFriend component that receives 'user' as a prop
export default function CloseFriend({user}) {

  // define the public folder path
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
  
    // 'sidebarFriend' is the class for the wrapper of each friend's information
    <li className="sidebarFriend">
    
      {/* // 'sidebarFriendImg' displays the friend's profile picture */}
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      
      {/* // 'sidebarFriendName' displays the friend's username */}
      <span className="sidebarFriendName">{user.username}</span>
      
    </li>
  );
}
