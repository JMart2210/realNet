// Import necessary hooks, components, and data from React, Material UI, and other modules
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

// Define the Rightbar component
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // Define path to public folder
  const [friends, setFriends] = useState([]); // Define a state variable for friends

  // Use useContext hook to get current user from the authentication context
  const {user:currentUser} = useContext(AuthContext);

  // Define a state variable to track if the currentUser is following the user of the profile
  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));

  // Use useEffect hook to get friends data when the user changes
  useEffect (() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id); // API call to get user's friends
        setFriends(friendList.data); // Set the friends state with the received data
      } catch (err) {
        console.log(err); // Log any errors
      }
    }
    getFriends(); // Execute the getFriends function
  }, [user]);

  // Define a function to handle follow/unfollow click
  const handleClick = async () => {
    try {
      // If currently followed
      if (followed) {
        // API call to unfollow the user
        await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id});
        setFollowed(false); // Update the followed state to false
        // Dispatch the 'UNFOLLOW' action to the reducer with the user's id as payload
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else {
        // If not currently followed, API call to follow the user
        await axios.put("/users/" + user._id + "/follow", {userId: currentUser._id});
        setFollowed(true); // Update the followed state to true
        // Dispatch the 'FOLLOW' action to the reducer with the user's id as payload
        dispatch({type: "FOLLOW", payload: user._id});
      }
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  // Define the HomeRightbar component (displayed when on the homepage)
  const HomeRightbar = () => {
    return (
      <>
        {/* Display birthday notifications */}
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        {/* Display ad image */}
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        {/* Display online friends */}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  // Define the ProfileRightbar component (displayed when on a user profile page)
  const ProfileRightbar = () => {
    return (
      <>
        {/* Show follow/unfollow button only if the profile user is not the current user */}
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {/* Display user information */}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{currentUser.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{currentUser.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{currentUser.relationship === 1 
              ? "Single" 
              : currentUser.relationship === 2 
              ? "Married" 
              : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
              <div key={friend._id} className="rightbarFollowing">
              <img
                src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
                />
              <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* If a user is passed as prop, render the ProfileRightbar, else render the HomeRightbar */}
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
