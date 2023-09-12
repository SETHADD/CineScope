const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const axios = require("axios");
const { request } = require("http");
require("dotenv").config();
const PORT = process.env.PORT || 9010;
const app = express();
app.use(cors());
app.use(bp.json());
// Create an endpoint to the root route

const Comments = require("./models/comments");

mongoose.connect(process.env.MONGODB_KEY);

app.get("/", (request, response) => {
  response.status(200).json("can I be heard?");
});

//view comments
app.get("/moviesComment", async (request, response) => {
  const comment = await Comments.find();
  response.status(200).json(comment);
});

// create comments
app.post("/moviesComment", async (request, response) => {
  const newComment = await Comments.create(request.body);
  response.status(200).json(newComment);
});

// update comments

app.put("/moviesComment/:id", (response, request) => {
  Comments.findByIdAndUpdate(request.params.id, request.body);
  response.status(204).send();
});

// delete comments

app.delete("/moviesComment/:id", async (request, response) => {
  const id = request.params.id;
  const deleteComment = await Comments.findByIdAndDelete(id);
  response.status(200).json(deleteComment);
});

app.get("/movies", async (request, response) => {
  const movieTitle = request.query.title;
  const API = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${movieTitle}`;

  const res = await axios.get(API);
  response.status(200).json(res.data);
  console.log("movies server awake and runing");
});

app.get("/videos", async (request, response) => {
  const realedYear = request.query.year;
  const movieTitle = request.query.title;
  const API2 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieTitle}+${realedYear}+official+trailer&key=${process.env.YOUTUBE_KEY2}`;
  const res = await axios.get(API2);
  response.status(200).json(res.data.items[0].id.videoId);
  console.log("Video is working");
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
