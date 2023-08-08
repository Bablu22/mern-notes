const Note = require("../models/notes");
const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const getNotes = async (userId, page, limit, searchQuery, selectedCategory) => {
  try {
    const query = { user: userId };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (selectedCategory && selectedCategory !== "null") {
      query.category = selectedCategory;
    }

    const [notes, count] = await Promise.all([
      Note.find(query)
        .populate("category", "name")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec(),
      Note.countDocuments(query),
    ]);

    const totalPages = Math.ceil(count / limit);
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;

    return {
      notes,
      totalPages,
      currentPage: page,
      prevPage,
      nextPage,
    };
  } catch (error) {
    throw error;
  }
};

const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, user: userId }).populate(
    "category",
    "name"
  );

  if (!note) {
    throw new AppError("Note not found.", 404);
  }
  return note;
};

const updateNote = async (noteId, updateData, photoFile) => {
  if (
    updateData.category &&
    !mongoose.Types.ObjectId.isValid(updateData.category)
  ) {
    throw new AppError("Invalid category ID.", 400);
  }

  const updateNote = await Note.findOneAndUpdate({ _id: noteId }, updateData, {
    new: true,
  });

  if (!updateNote) {
    throw new AppError("Note not found.", 404);
  }

  if (photoFile) {
    const result = await cloudinary.uploader.upload(photoFile.path, {
      folder: "note_app/",
    });
    updateNote.photoUrl = result.secure_url;
    await updateNote.save();
  }

  return updateNote;
};

const deleteNote = async (noteId, userId) => {
  const deleteNote = await Note.findOneAndDelete({ _id: noteId, user: userId });

  if (!deleteNote) {
    throw new AppError("Note not found.", 404);
  }
  return deleteNote;
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteById,
};
