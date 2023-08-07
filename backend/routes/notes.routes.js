const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { NoteModel } = require("../models/note.model");

const notesController = Router();

notesController.get("/", async (req, res) => {
  const notes = await NoteModel.find({ userId: req.body.userId });
  res.send(notes);
});
notesController.post("/create", async (req, res) => {
  const { Heading, Note, Tag, userId } = req.body;
  const note = new NoteModel({ Heading, Note, Tag, userId });
  try {
    await note.save();
    res.send("note created");
  } catch (error) {
    // res.send(error);
    res.send("something went wrong");
  }
});

notesController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await NoteModel.findOneAndDelete({
    _id: noteId,
    userId: req.body.userId,
  });
  if (deletedNote) {
    res.send("deleted");
  } else {
    res.send("could not delete");
  }
});

notesController.patch("/edit/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const {} = req.body
  const deletedNote = await NoteModel.findOneAndDelete({
    _id: noteId,
    userId: req.body.userId,
  });
  if (deletedNote) {
    res.send("deleted");
  } else {
    res.send("could not delete");
  }
});

module.exports = { notesController };
