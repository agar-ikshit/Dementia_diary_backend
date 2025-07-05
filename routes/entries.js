const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); 
const Entry = require('../models/Entry'); // Assuming you have an Entry model
const router = express.Router();



router.use(verifyToken);

router.get('/', verifyToken, async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.user.id }).lean(); // lean() returns plain JS objects
        const formatted = entries.map(e => ({
            id: e._id,                   
            title: e.title,
            content: e.content,
            fontSize: e.fontSize,
            textColor: e.textColor,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
        }));
        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Get the most recent 10 entries for a user (using _id timestamp)
// Get the most recent 10 entries for a user
router.get('/recent', verifyToken, async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.user.id })
            .sort({ _id: -1 })
            .limit(10)
            .lean(); // convert to plain JS objects

        const formatted = entries.map(e => ({
            id: e._id,
            title: e.title,
            content: e.content,
            fontSize: e.fontSize,
            textColor: e.textColor,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
        }));

        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Get a single entry by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.id }).lean();
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        const formatted = {
            id: entry._id,
            title: entry.title,
            content: entry.content,
            fontSize: entry.fontSize,
            textColor: entry.textColor,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt
        };

        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Create a new entry
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; 
    console.log("req.user:", req.user);
    console.log("the request is : ",req.user.id);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }
    try {
        const newEntry = new Entry({title, content, userId});
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
        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content },
            { new: true }
        );
        if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });

        res.status(200).json(updatedEntry);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Delete an entry
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.id });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });

        // Remove by ID:
        await Entry.deleteOne({ _id: req.params.id, userId: req.user.id });

        res.status(200).json({ message: 'Entry deleted' });
    } catch (err) {
        console.error("Error deleting entry:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



module.exports = router;
