import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let notes = [
//   { id: "2", text: "CPSC 2650", image: null },
//   { id: "1", text: "An awesome web dev note", image: null },
// ];
let notes = [];

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});

const getUnsplashImage = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const image = data.results[Math.floor(Math.random() * data.results.length)];
    return {
      url: image.urls.small,
      author: {
        name: image.user.name,
        link: image.user.links.html,
      },
    };
  }
  return null;
};

app.post("/notes", async (req, res) => {
  const note = req.body;
  const image = await getUnsplashImage(note.text);
  if (image) {
    note.image = image;
  }
  notes.push(note);
  res.status(201).json(note);
});

app.patch("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    const image = await getUnsplashImage(updatedNote.text);
    if (image) {
      updatedNote.image = image;
    }
    notes[index] = { ...notes[index], ...updatedNote };
    res.json(notes[index]);
  } else {
    res.status(404).send("Note not found");
  }
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
