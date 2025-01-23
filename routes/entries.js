const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); 
const Entry = require('../models/Entry'); // Assuming you have an Entry model
const router = express.Router();



router.use(verifyToken);

router.get('/', verifyToken, async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.userId });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get the most recent 10 entries for a user (using _id timestamp)
router.get('/recent', verifyToken, async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.user.userId })
            .sort({ _id: -1 }) // Sort by the _id field in descending order (newest first)
            .limit(10);

        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Get a single entry by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(entry);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create a new entry
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId; 
    console.log("the request is : ",req.user.userId);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }
    try {
        const newEntry = new Entry({title, content, userId: req.user.userId });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ message: 'Error creating entry', error: err.message });
    }
    // console.log('Token:', token);
    // console.log('Decoded User:', user);

});

// Update an existing entry
router.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        entry.title = title;
        entry.content = content;
        await entry.save();
        res.status(200).json(entry);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete an entry
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        
        const entry = await Entry.findOne({ _id: mongoose.Types.ObjectId(req.params.id), userId: req.userId });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        await entry.remove();
        res.status(200).json({ message: 'Entry deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
