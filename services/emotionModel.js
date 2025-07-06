const { Client } = require("@gradio/client");

async function detectEmotion(text) {
  try {
    const client = await Client.connect("ikshit2004/emotion");
    const result = await client.predict("/predict", { text });
    console.log("Raw result:", result.data);
    return result.data[0];  // Gradio returns array like ['joy'], return first element
  } catch (error) {
    console.error("Error calling Hugging Face emotion model:", error);
    throw new Error("Emotion detection failed");
  }
}

module.exports = { detectEmotion };
