// IMPORTS
const mongoose = require("mongoose");

// POST SCHEMA
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 50,
      minlength: 1,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      maxlength: 148,
      minlength: 1,
    },
    image: {
      type: String,
      required: null,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
