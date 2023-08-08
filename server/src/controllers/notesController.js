const User = require("../models/user");
const NoteService = require("../services/noteServices");
const multer = require("multer");

const {
  validateCreateNoteRequest,
  validateUpdateNoteRequest,
} = require("../utils/validation");

const createNote = async (req, res) => {
  try {
    validateCreateNoteRequest(req);
    const { title, content, category, photoUrl } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const noteData = {
      title,
      content,
      category,
      user: userId,
      photoUrl,
    };

    const note = await NoteService.createNote(noteData);

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.searchQuery || "";
    const selectedCategory = req.query.selectedCategory || null;

    const notes = await NoteService.getNotes(
      userId,
      page,
      limit,
      searchQuery,
      selectedCategory
    );

    res.status(200).json(notes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await NoteService.getNoteById(noteId, userId);

    res.status(200).json(note);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    validateUpdateNoteRequest(req);

    const noteId = req.params.id;
    const { title, content, category } = req.body;
    const userId = req.user.id;
    const photoFile = req.file;

    const updateData = {
      title,
      content,
      category,
      user: userId,
    };

    const updatedNote = await NoteService.updateNote(
      noteId,
      updateData,
      photoFile
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    await NoteService.deleteNote(noteId, userId);

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteById,
};
