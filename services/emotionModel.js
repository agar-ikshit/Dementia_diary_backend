const axios = require('axios');

async function detectEmotion(text) {
    try {
        const response = await axios.post(
            'https://ikshit2004-emotion.hf.space/run/predict',
            { data: [text] }
        );

        // Adjust based on actual response format; typically:
        return response.data.data[0];
    } catch (error) {
        console.error('Error calling Hugging Face emotion model:', error.message);
        throw new Error('Emotion detection failed');
    }
}

module.exports = detectEmotion;
