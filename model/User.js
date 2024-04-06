// File: UserModel.js
// Student's Name: Mohit Kukreja
// StudentID: 200567833

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Method to verify user password
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Method to create a new user
userSchema.statics.createUser = async function (username, password, email) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return this.create({ username, password: hashedPassword, email });
};

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
