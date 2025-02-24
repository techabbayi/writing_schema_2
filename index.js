const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./schema');

const app = express();
const port = 3010;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/BlogPostDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  
// Creating a new Blog Post
app.post('/BlogPosts', async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Blog posts
app.get('/BlogPosts', async (req, res) => {
  try {
    const BlogPosts = await BlogPost.find();
    res.json(BlogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single Blog Post by ID
app.get('/BlogPosts/:id', async (req, res) => {
  try {
    const BlogPost = await BlogPost.findById(req.params.id);
    if (!BlogPost) return res.status(404).json({ error: "BlogPost post not found" });
    res.json(BlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Blog Post by ID
app.put('/BlogPosts/:id', async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, runValidators: true 
    });
    if (!updatedBlogPost) return res.status(404).json({ error: "BlogPost post not found" });
    res.json(updatedBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Blog Post by ID
app.delete('/BlogPosts/:id', async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) return res.status(404).json({ error: "BlogPost post not found" });
    res.json({ message: "BlogPost post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a Blog Post
app.post('/BlogPosts/:id/comments', async (req, res) => {
  try {
    const BlogPost = await BlogPost.findById(req.params.id);
    if (!BlogPost) return res.status(404).json({ error: "BlogPost post not found" });

    BlogPost.comments.push(req.body);
    await BlogPost.save();
    res.status(201).json(BlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
