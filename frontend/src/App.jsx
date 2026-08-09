import { useEffect, useState } from "react";

import Form from "./Components/Form";
import List from "./Components/List";
import Header from "./Components/Header";

import { getNotes, deleteNote } from "./services/noteAPI";

import { MdSearch } from "react-icons/md";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // GET NOTES
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError(
          "Unable to connect to the server. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // ADD NOTE
  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // EDIT BUTTON
  const handleEdit = (note) => {
    setEditingNote(note);

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE NOTE
  const handleNoteUpdated = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
    setEditingNote(null);
  };

  // DELETE NOTE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteNote(id);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note");
    }
  };

  // SEARCH
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      
      <Header />

      {/* SEARCH */}
      <div className="search-box">
        <MdSearch className="search-icon" />

        <input
          className="search"
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FORM */}
      <Form
        onNoteAdded={handleNoteAdded}
        editingNote={editingNote}
        onNoteUpdated={handleNoteUpdated}
        cancelEdit={() => setEditingNote(null)}
      />

      {/* NOTES */}
      {loading ? (
        <div className="empty">
          <h3>Loading notes...</h3>
        </div>
      ) : error ? (
        <div className="error">
          <h3>⚠️ Unable to connect</h3>
          <p>{error}</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="empty">
          <h3>No notes yet 📝</h3>
          <p>Create your first note.</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="empty">
          <h3>No matching notes 🔍</h3>
          <p>Try searching with a different keyword.</p>
        </div>
      ) : (
        <List
          notes={filteredNotes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;