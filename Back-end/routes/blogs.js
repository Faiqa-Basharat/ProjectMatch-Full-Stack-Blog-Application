const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const router = express.Router();

const CATEGORIES = Blog.CATEGORIES;

function clean(body) {
  return {
    title: String(body.title || '').trim(),
    content: String(body.content || '').trim(),
    category: CATEGORIES.includes(body.category) ? body.category : 'Other'
  };
}

function problem(data) {
  if (!data.title || !data.content) return 'Title and content are required.';
  if (data.title.length > 120) return 'Title must be 120 characters or less.';
  return null;
}

// CREATE: POST /api/blogs (login required)
router.post('/', auth, async (req, res) => {
  try {
    const data = clean(req.body);
    const msg = problem(data);
    if (msg) return res.status(400).json({ message: msg });
    const blog = await Blog.create({ ...data, author: req.userId });
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// READ ALL: GET /api/blogs?search=word&category=Education
router.get('/', async (req, res) => {
  try {
    const filter = {};
    const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 60) : '';
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ title: rx }, { content: rx }];
    }
    if (CATEGORIES.includes(req.query.category)) filter.category = req.query.category;

    const blogs = await Blog.find(filter).populate('author', 'name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// GET /api/blogs/mine  (only the logged-in user's blogs)
router.get('/mine', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId }).populate('author', 'name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// READ ONE: GET /api/blogs/:id
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: 'Blog not found.' });
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// UPDATE: PUT /api/blogs/:id (author only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: 'Blog not found.' });
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: 'You can only edit your own blogs.' });

    const data = clean(req.body);
    const msg = problem(data);
    if (msg) return res.status(400).json({ message: msg });

    blog.title = data.title;
    blog.content = data.content;
    blog.category = data.category;
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// DELETE: DELETE /api/blogs/:id (author only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: 'Blog not found.' });
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: 'You can only delete your own blogs.' });

    await blog.deleteOne();
    res.json({ message: 'Blog deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
