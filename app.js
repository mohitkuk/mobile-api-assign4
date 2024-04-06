// File: app.js
// Student's Name: Mohit Kukreja
// StudentID: 200567833


import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import session from 'express-session';
import bookRoutes from './routes/bookRoutes.js';
import './routes/passport-config.js';


const app = express();
app.use(session({ secret: '8mOdEAQBZX', resave: false, saveUninitialized: false }));

app.use(bodyParser.json());
app.use(passport.initialize());

// MongoDB connection
connect('mongodb+srv://user1234:user1234@cluster0.wfbefe7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.use('/api', authRoutes);
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
