const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotion: String,                // ✅ new field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  textColor: String,
  fontSize: Number
});

module.exports = mongoose.model('Entry', entrySchema);
