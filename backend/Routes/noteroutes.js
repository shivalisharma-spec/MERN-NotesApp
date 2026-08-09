import express from "express";

import {addNote,getNotes,updateNote,deleteNote,} from "../Controller/notecontroller.js";

const router = express.Router();

// Add Note
router.post("/", addNote);

// Get All Notes
router.get("/", getNotes);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

export default router;