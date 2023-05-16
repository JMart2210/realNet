import { useContext, useRef, useState } from "react";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Cancel } from "@mui/icons-material";

export default function Share() {
  // Fetching user details from the AuthContext
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // Using useRef for getting the value of the description input field
  const desc = useRef();
  // Using useState for handling the file (image) state
  const [file, setFile] = useState(null);
  
  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Creating newPost object with user details and description
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // If file is selected, create FormData and upload file
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data);
      } catch(err){
        console.log(err)
      }
    }
    
    // Post newPost data to '/posts' API endpoint
    try{
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch(err){
      console.log(err)
    }
  };

  // Render the Share component
return (
  <div className="share">
    <div className="shareWrapper">
      <div className="shareTop">
        {/* Display the user's profile picture if available, otherwise display a placeholder */}
        <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" />
        {/* Input field for user to type their post description */}
        <input
          placeholder="Share with the group..."
          className="shareInput"
          ref={desc}
        />
      </div>
      <hr className="shareHr"/>
      {/* Display the selected image file, if any */}
      {file && (
        <div className="shareImgContainer">
          {/* Display the selected image */}
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          {/* Cancel button to deselect the selected image */}
          <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
        </div>
      )}
      {/* The form for creating a new post */}
      <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
              {/* Option to upload a photo or video */}
              <label htmlFor="file" className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon"/>
                  <span className="shareOptionText">Photo or Video</span>
                  {/* Hidden file input to handle the file upload */}
                  <input
                    style={{display: "none"}} 
                    type="file" 
                    id="file" 
                    accept=".png, .jpeg, .jpg" 
                    onChange={(e) => setFile(e.target.files[0])} 
                  />
              </label>
              {/* Option to tag other users */}
              <div className="shareOption">
                  <Label htmlColor="blue" className="shareIcon"/>
                  <span className="shareOptionText">Tag</span>
              </div>
              {/* Option to add a location */}
              <div className="shareOption">
                  <Room htmlColor="green" className="shareIcon"/>
                  <span className="shareOptionText">Location</span>
              </div>
              {/* Option to add feelings/emotions */}
              <div className="shareOption">
                  <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                  <span className="shareOptionText">Feelings</span>
              </div>
          </div>
          {/* Button to submit the form and create the post */}
          <button className="shareButton" type="submit">Share</button>
      </form>
    </div>
  </div>
);

}
