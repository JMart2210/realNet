// Import necessary hooks, components, and libraries
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from 'timeago-react';
import { AuthContext } from "../../context/AuthContext";

// Define the Post component, which receives a 'post' object as a prop
export default function Post({ post }) {
  
  // Create state variables for the number of likes, whether the post is liked, and the user
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  
  // Define a constant for the public folder path
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  // Get the current user from the AuthContext
  const { user:currentUser } = useContext(AuthContext); 

  // Define a side effect that sets 'isLiked' depending on whether the current user has liked the post
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  // Define a side effect that fetches the user data for the post's author
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);

  // Define a function for handling like actions
  const likeHandler = async ()=>{
    try{
      // Send a PUT request to the server to update the like status of the post
      axios.put("/posts/"+post._id+"/like", {userId: currentUser._id})
    } catch(err){
      console.log(err)
    };
    // Update the 'like' and 'isLiked' states depending on the current like status
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  };

  // Render the Post component
  return (
    // The structure of the post consists of a wrapper and three main sections: top, center, and bottom
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* // Link to the user's profile and display the user's profile picture and username */}
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            {/* // Display the post creation date using the TimeAgo library */}
            <span className="postDate">{<TimeAgo datetime={post.createdAt}/>}</span>
          </div>
          <div className="postTopRight">
            {/* // Display the MoreVert icon */}
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {/* // Display the post text and image */}
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          {/* // Display the like and heart icons, which trigger the likeHandler function when clicked */}
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter"> 
            {/* // If there are no likes, display a prompt for the first like. Otherwise, display the number of likes */}
            {like === 0
              ? "Be the first to like this post!"
              : `${like} people like this post`}
            </span>
          </div>
          <div className="postBottomRight">
            {/* // Display the number of comments */}
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

