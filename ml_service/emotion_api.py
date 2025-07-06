

from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load your model once when the server starts
model = joblib.load("./models/emotion_classifier_pipe_lr.pkl")

class TextRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    emotion: str

@app.post("/predict", response_model=PredictionResponse)
def predict_emotion(req: TextRequest):
    prediction = model.predict([req.text])[0]
    return {"emotion": prediction}
