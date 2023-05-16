// import necessary hooks and components
import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// define the Feed component that receives 'username' as a prop
export default function Feed({ username }) {
  
  // create a state variable 'posts' to hold the posts data
  const [posts, setPosts] = useState([]);
  
  // get the current user from the AuthContext
  const { user } = useContext(AuthContext);
 
  // define a side effect that fetches posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
    
      // depending on whether a username is provided, fetch either profile posts or timeline posts
      const res = username 
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("posts/timeline/" + user._id);
      
      // update the 'posts' state with the fetched posts, sorting them by creation date
      setPosts(res.data.sort( (p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }) );
    }
    
    // execute the fetchPosts function
    fetchPosts();
    
    // the effect depends on the username and the user's ID, so it re-runs whenever these values change
    }, [username, user._id]);

  // render the Feed component
  return (
  
    // 'feed' and 'feedWrapper' are classes for the Feed component's layout
    <div className="feed">
      <div className="feedWrapper">
      
        {/* // if no username is provided or the provided username is the current user's, render the Share component */}
        {(!username || username === user.username) && <Share />}
        
        {/* // for each post in 'posts', render a Post com4ponent */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        
      </div>
    </div>
  );
}
