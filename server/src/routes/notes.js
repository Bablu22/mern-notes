const express = require("express");
const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  getNoteById,
} = require("../controllers/notesController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(verifyToken, createNote).get(verifyToken, getNotes);

router
  .route("/:id")
  .get(verifyToken, getNoteById)
  .put(verifyToken, updateNote)
  .delete(verifyToken, deleteNote);

module.exports = router;
