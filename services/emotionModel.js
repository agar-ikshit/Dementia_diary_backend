import { Client } from "@gradio/client";

export default async function detectEmotion(text) {
  try {
    // Connect to your Space
    const client = await Client.connect("ikshit2004/emotion");

    // Call the /predict function
    const result = await client.predict("/predict", {
      text: text
    });

    console.log("Raw result:", result.data[0]);
    return result.data[0];  // This will be the predicted emotion string
  } catch (error) {
    console.error("Error calling Hugging Face emotion model:", error);
    throw new Error("Emotion detection failed");
  }
}
