import { useState, useEffect } from "react";
import axios from "axios";
import RenderForms from "../RenderForms/RenderForms";
import NewForm from "../NewForm/NewForm";
import "./Forum.css";

export default function Forum() {
  //   new code down
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  // READ
  async function getComments() {
    let API = "https://cinescope-5wiz.onrender.com/moviesComment";
    const result = await axios.get(API);
    console.log(result.data);
    setComments(result.data);
  }

  // CREATE
  const handleAddComment = async (newCommentFormData) => {
    const res = await axios.post(
      "https://cinescope-5wiz.onrender.com/moviesComment",
      newCommentFormData
    );
    setComments([...comments, res.data]);
  };

  // delete comment
  const handleDeleteComment = async (id) => {
    const res = await axios.delete(
      `https://cinescope-5wiz.onrender.com/moviesComment/${id}`
    );
    console.log(res);
    getComments();
  };

  // UPDATE

  const handleUpdateComment = async (comment) => {
    await axios.put(
      `https://cinescope-5wiz.onrender.com/moviesComment/${comment._id}`,
      comment
    );
    getComments();
  };
  // new code up

  return (
    <div>
      <div className="about-us">
        <h3>ABOUT US</h3>
        <p>
          This application should focus on targeting film enthusiasts or anyone
          who wants to find out more information about a certain film. The
          application should provide them with the ability to search for a film
          and have all the relevant details and posters displayed on the page
          through a clean UI and easy to navigate interface.
        </p>
      </div>
      <div className="comments">
        <RenderForms
          comments={comments}
          handleDeleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
        />
      </div>
      <div className="newform">
        <NewForm onSubmitFunc={handleAddComment} />
      </div>

      {/* <img className="hero" src={bgimage}></img> */}
    </div>
  );
}
