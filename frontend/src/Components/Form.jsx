import { useEffect, useState } from "react";
import { addNote, updateNote } from "../services/noteAPI";

function Form({ onNoteAdded, editingNote, onNoteUpdated, cancelEdit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // When editingNote changes, fill the form
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }
  
    try {
      if (editingNote) {
        // UPDATE
        const updatedNote = await updateNote(
          editingNote._id,
          {
            title,
            description
          }
        );
        onNoteUpdated(updatedNote);
      } 
      else {
        // ADD
        const newNote = await addNote({
          title,
          description
        });
        onNoteAdded(newNote);
      }
      setTitle("");
      setDescription("");
    } 
    catch (error) {
      console.error("Error:", error);
      alert("Failed to save note");
    }
  };

  return (
    <div className="form">

      <h2>
        {editingNote ? "Edit Note" : "Add New Note"}
      </h2>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button
          type="button"
          className="cancel"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      )}

    </div>
  );
}

export default Form;