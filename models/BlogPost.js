// Importing Mongoose library for defining schema
import mongoose from "mongoose";

// Creating a new Mongoose schema for blog posts
const BlogPostSchema = new mongoose.Schema({
  // User reference (if applicable)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  // Product name associated with the blog post
  productName: {
    type: String,
    require: true,
    maxlength: 100,
  },

  // Title of the blog post
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },

  // Content of the blog post
  content: {
    type: String,
    required: true,
  },

  // Author of the blog post
  author: {
    type: String,
    required: true,
    maxlength: 60,
  },

  // Creation date of the blog post (default is the current date)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on the user field
BlogPostSchema.index({ user: 1 });

// Exporting the Mongoose model for the blog post
export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
