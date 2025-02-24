const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CommentSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    }
  });




const BlogPostSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true, 
      minlength: [5, 'Title Should be at least 5 characters long'],
    },
    content: {
      type: String,
      required: true, // Content is required
      minlength: [50, 'Content should be at least 50 characters long'],
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'General', 
    },
    likes: {
      type: [String],
      default: [], 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    comments: [CommentSchema], 
  });



const BlogPost = mongoose.model('Blog', BlogPostSchema)

module.exports = BlogPost;

// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   message: { type: String, required: true },
//   commentedAt: { type: Date, default: Date.now }
// });

// const blogSchema = new mongoose.Schema({
//   title: { type: String, unique: true, required: true, minlength: 5 },
//   content: { type: String, required: true, minlength: 50 },
//   author: { type: String, required: true },
//   tags: { type: [String] },
//   category: { type: String, default: "General" },
//   likes: { type: [String] },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
//   comments: [commentSchema]
// });

// const Blog = mongoose.model('Blog', blogSchema);

// module.exports = Blog;
