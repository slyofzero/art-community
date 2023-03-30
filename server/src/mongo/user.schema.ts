import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    // ---------- Username ----------
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ---------- User verification ----------
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ---------- Personal Details ----------
    firstName: {
      type: String,
      required: true,
    },

    middleName: String,

    lastName: String,

    DOB: {
      type: String,
      required: true,
    },

    bio: String,
  },
  { timestamps: true },
);
