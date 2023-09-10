import React from "react";
import searchIcon from "./icons/Search.png";
import bgimage from "./icons/Abstract 2.png";
// import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ setMovieData, handleInputChange, movieTitle }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API = `https://cinescope-5wiz.onrender.com/movies?title=${movieTitle}`;
    const response = await axios.get(API);
    console.log(response);
    setMovieData(response.data);
    navigate("/Form");
  };

  return (
    <div>
      <h3>
        Cine<span className="highlight2"></span>
      </h3>
      <form className="form2">
        <input
          className="tab2"
          placeholder="search movies"
          type="text"
          onChange={handleInputChange}
        ></input>
        <button className="button2" onClick={handleSubmit}>
          <img className="icon2" src={searchIcon} alt="submit" />
        </button>
      </form>
      <img className="hero" src={bgimage} alt=""></img>
    </div>
  );
}
