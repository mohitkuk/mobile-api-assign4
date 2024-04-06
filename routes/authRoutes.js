// File: AuthRoutes.js
// Student's Name: Mohit Kukreja
// StudentID: 200567833

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../model/User.js';

// Create a new router instance
const router = Router();

// Configure the local strategy for passport
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user || !user.verifyPassword(password)) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Registration/Signup route
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await User.createUser(username, password, email);
    const token = jwt.sign(newUser.toJSON(), 'your_secret_key');

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign(user.toJSON(), '8mOdEAQBZX');
    return res.json({ token });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  console.log('Logout route reached');
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.sendStatus(204);
  });
});
// Export the router
export default router;
