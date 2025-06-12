import Note from '../models/Note.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
}

export async function getNoteById(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    console.log('Received request to create note:', req.body);
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const newNote = new Note({
      title,
      content
    });
    console.log('Creating new note:', newNote);
    await newNote.save();
    res.status(201).json({
      message: 'Note created successfully',
      note: newNote
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
}

export async function updateNote(req, res) {
  const { id } = req.params;
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({
      message: `Note with ID ${id} updated successfully`,
      note: updatedNote
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
}

export async function deleteNote(req, res) {
  try{
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({
      message: `Note with ID ${id} deleted successfully`,
      note: deletedNote
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
}
