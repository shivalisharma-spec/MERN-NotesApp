import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

// Get all notes
export const getNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a note
export const addNote = async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

// Update a note
export const updateNote = async (id, note) => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};