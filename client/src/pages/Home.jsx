import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = () => {
    const note = { id: new Date().getTime().toString(), text: noteText };
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((newNote) => {
        setNotes([...notes, newNote]);
        setNoteText(""); // Reset the input field after adding the note
      });
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    }).then(() => setNotes(notes.filter((note) => note.id !== id)));
  };

  return (
    <div>
      <h1>GENERATE IMAGE</h1>
      <p>Your image should be generated about what?</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <Link to={`/note/${note.id}`}>Edit</Link>
            {note.image && (
              <div>
                <img src={note.image.url} alt="Note" />
                <p>
                  Photo by{" "}
                  <a
                    href={note.image.author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {note.image.author.name}
                  </a>
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Image content"
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
};

export default Home;
