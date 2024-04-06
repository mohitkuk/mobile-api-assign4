// File: BookModel.js
// Student's Name: Mohit Kukreja
// StudentID: 200567833

import mongoose from 'mongoose';

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  booksName: { type: String, required: true },
  ISBN: { type: String, required: true },
  rating: { type: Number, required: true },
  author: { type: String, required: true },
});

// Create the Book model based on the schema
const BookModel = mongoose.model('Book', bookSchema);

// Export the Book model
export default BookModel;
