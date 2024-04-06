// File: BookRoutes.js
// Student's Name: Mohit Kukreja
// StudentID: 200567833
import { Router } from 'express';
import passport from 'passport';
import BookModel from '../model/Book.js';

const router = Router();
import Book from '../model/Book.js';

router.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Decoded Token:', req.user);
    next();
  })(req, res, next);
});


// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find({});
    console.log('Books List:', books); // Log the list of books
    res.json(books);
  } catch (error) {
    console.error('Error in GET request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/books', async (req, res) => {
  try {
    const { booksName, author, rating, ISBN } = req.body;

    // Create a new book instance
    const newBook = new Book({
      booksName: booksName,
      author: author,
      rating: rating,
      ISBN: ISBN,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  BookModel.findById(bookId, (err, book) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  });
});
router.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating } = req.body;

  try {
    // Find and update the book by ID
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { title, author, rating },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return the updated book
    res.json({ updatedBook });
  } catch (error) {
    console.error('Error in PUT request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await BookModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
