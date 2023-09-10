import "./Reset.css";
import "./App.css";
import Form from "./Components/Form/Form";
import Forum from "./Components/Forum/Forum";
import Home from "./Components/Home/Home";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState({});
  const [playerData, setPlayerData] = useState({});
  useEffect(() => {
    player();
  }, [movieData]);

  const player = async () => {
    const API = `https://cinescope-5wiz.onrender.com/videos?title=${movieTitle}`;
    const res = await axios.get(API);
    setPlayerData(res.data);
  };

  const handleInputChange = (event) => {
    setMovieTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API = `https://cinescope-5wiz.onrender.com/movies?title=${movieTitle}`;
    const response = await axios.get(API);
    console.log(response);
    setMovieData(response.data);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <Link to="/Forum" className="list">
              Forum
            </Link>
            <Link to="/Form" className="list">
              Movies
            </Link>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setMovieData={setMovieData}
              handleInputChange={handleInputChange}
              movieTitle={movieTitle}
            />
          }
        />
        <Route path="/Forum" element={<Forum />} />
        <Route
          path="/Form"
          element={
            <Form
              movieData={movieData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              movieTitle={movieTitle}
              playerData={playerData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
