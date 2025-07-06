async function detectEmotion(text) {
  try {
    // Dynamically import the ESM-only @gradio/client
    const { Client } = await import("@gradio/client");

    const client = await Client.connect("ikshit2004/emotion");
    const result = await client.predict("/predict", { text });
    console.log("Raw result:", result.data);
    return result.data[0];  // e.g., 'joy'
  } catch (error) {
    console.error("Error calling Hugging Face emotion model:", error);
    throw new Error("Emotion detection failed");
  }
}

module.exports = { detectEmotion };
