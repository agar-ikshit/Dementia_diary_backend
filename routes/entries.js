const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); 
const detectEmotion = require('../services/emotionModel');
const Entry = require('../models/Entry'); 

const router = express.Router();
router.use(verifyToken);

const supportedEmotions = [
  "anger", "disgust", "fear", "happy", "joy", "neutral", "sad", "sadness", "shame", "surprise"
];

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.userId }).lean();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get recent entries
router.get('/recent', async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.userId })
      .sort({ _id: -1 })
      .limit(10)
      .lean();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Search by emotion → must be BEFORE /:id
router.get('/search', async (req, res) => {
  const { emotion } = req.query;
  console.log("Search called with emotion:", emotion);

  if (!emotion) {
    return res.status(400).json({ message: 'Emotion query missing' });
  }

  const lowerEmotion = emotion.toLowerCase();
  console.log("Lowercased emotion:", lowerEmotion);

  if (!supportedEmotions.includes(lowerEmotion)) {
    return res.status(400).json({ 
      message: `Unsupported emotion '${emotion}'. Try one of: ${supportedEmotions.join(', ')}` 
    });
  }

  try {
    const entries = await Entry.find({ 
      userId: req.user.userId, 
      emotion: lowerEmotion
    }).sort({ createdAt: -1 }).limit(10).lean();

    console.log("Entries found:", entries.length);
    res.json(entries);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

// Get entry by id
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.userId }).lean();
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create entry
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const emotion = await detectEmotion(content);
    const newEntry = new Entry({ title, content, userId, emotion });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Error creating entry', error: err.message });
  }
});

// Update entry
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, content },
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete entry
router.delete('/:id', async (req, res) => {
  const entryId = req.params.id;
  const userId = req.user.userId;

  try {
    const entry = await Entry.findOne({ _id: entryId, userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    await Entry.deleteOne({ _id: entryId, userId });
    res.status(200).json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
