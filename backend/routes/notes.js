const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Notes")
const { check, validationResult } = require('express-validator');

//Get All Notes using : GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes);
})

//Add a new note using : POST "api/notes/addnote"
router.post("/addnote", fetchuser, [
    check('title', 'Title length should be atleast 3 characters')
        .isLength({ min: 3 }),
    check('description', 'Description length should be atleast 5 characters')
        .isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Note({ title, description, tag, user: req.user.id })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message)
    }
})

//Update an existing Note using : PUT "/api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") };

        //Allow updation only if user owns this note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized User");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message)
    }
})

//Delete an existing Note using : DELETE "/api/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted.
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") };

        //Allow deletion only if user owns this note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized User");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).send("Note Deleted");

    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router