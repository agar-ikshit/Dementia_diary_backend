const axios = require('axios');

async function detectEmotion(text) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/predict', {
            text: text
        });
        return response.data.emotion; // adjust if FastAPI response field is named differently
    } catch (error) {
        console.error('Error calling emotion detection service:', error.message);
        throw new Error('Emotion detection failed');
    }
}

module.exports = detectEmotion;
