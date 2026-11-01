const mongoose = require('mongoose');

const CATEGORIES = ['Technology', 'Design', 'Education', 'Career', 'Other'];

const blogSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true, maxlength: 120 },
  content:  { type: String, required: true },
  category: { type: String, enum: CATEGORIES, default: 'Other' },
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
Blog.CATEGORIES = CATEGORIES;
module.exports = Blog;
