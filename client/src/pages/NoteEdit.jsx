import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NoteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ text: "", image: null });

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`)
      .then((response) => response.json())
      .then((data) => setNote(data));
  }, [id]);

  const handleEdit = () => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then(() => navigate("/"));
  };

  return (
    <div>
      <h1>Note ID: {id}</h1>
      <input
        type="text"
        value={note.text}
        onChange={(e) => setNote({ ...note, text: e.target.value })}
      />
      <button onClick={handleEdit}>Save</button>
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
    </div>
  );
};

export default NoteEdit;
