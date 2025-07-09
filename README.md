# 🧠 Dementia Diaries – Backend

This is the **backend API** for the Dementia Diaries app – a journaling tool designed to help people with dementia reflect on their memories and moods.  
It handles user authentication, diary entry management, and integrates with an AI model deployed on Hugging Face to detect emotions from diary text.

🌐 **Live demo:** [dementia-diary-frontend.vercel.app](https://dementia-diary-frontend.vercel.app/)  
🧪 **Emotion detection model (Hugging Face Space):** [ikshit2004/emotion](https://huggingface.co/spaces/ikshit2004/emotion)  
📦 **Frontend repo:** [Dementia_diary_frontend](https://github.com/agar-ikshit/Dementia_diary_frontend)

---

## ✨ Features

- User registration & login (with JWT)
- Add new diary entries
- Automatically detect emotion of each entry via Hugging Face API
- Search diary entries by emotion category
- RESTful API built with Express

---

## 🚀 Getting Started

Follow these steps to run the backend locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/agar-ikshit/Dementia_diary_backend.git
   cd Dementia_diary_backend
   ```


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**
   Add your environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   HUGGING_FACE_API_URL=https://huggingface.co/spaces/ikshit2004/emotion
   ```

4. **Run the backend**

   ```bash
   npm start
   ```

   The server will start on [http://localhost:5000](http://localhost:5000)

---

## 📦 Project Structure

```
.
├── models/         # Mongoose models (e.g., User, DiaryEntry)
├── routes/         # Express routes for auth and diary
├── controllers/    # Business logic
├── services/       # Service to call Hugging Face emotion model
├── config/         # DB config & middleware
├── server.js       # App entry point
└── .env.example    # Example environment variables
```

---

## 🧰 Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) + Mongoose
* [JWT](https://jwt.io/) – Authentication
* [Axios](https://axios-http.com/) – HTTP requests to Hugging Face
* [Hugging Face Spaces](https://huggingface.co/spaces/ikshit2004/emotion) – Emotion detection model

---

## 📌 Frontend

The frontend is built in React with Tailwind CSS.

* **Live site:** [dementia-diary-frontend.vercel.app](https://dementia-diary-frontend.vercel.app/)
* **Frontend repo:** [Dementia\_diary\_frontend](https://github.com/agar-ikshit/Dementia_diary_frontend)

---

## 🙏 Contributing

Feel free to open issues or pull requests if you’d like to help improve this project.

---


## ✨ Credits

Made with ❤️ by [@agar-ikshit](https://github.com/agar-ikshit)
Helping people with dementia rediscover happier days.


