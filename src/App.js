import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (text.trim() === "") return;

    if (editId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text } : note
        )
      );
      setEditId(null);
    } else {
      setNotes([...notes, { id: Date.now(), text }]);
    }

    setText("");
    inputRef.current.focus();
  };

  const editNote = (note) => {
    setText(note.text);
    setEditId(note.id);
    inputRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Notes App</h1>

      <div className="input-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addOrUpdateNote}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
  {notes.map((note) => (
    <li key={note.id} className="note-item">
      <span className="note-text">{note.text}</span>

      <div className="note-actions">
        <button onClick={() => editNote(note)}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
  }
