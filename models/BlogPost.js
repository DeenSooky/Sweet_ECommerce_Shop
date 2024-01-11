import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false     
  },

  productName: {
    type: String,
    require: true,
    maxlength: 100,
  },

  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    maxlength: 60,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on the user field
BlogPostSchema.index({ user: 1 });

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
