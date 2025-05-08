require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


// Ganti dengan API Key kamu
const API_KEY = process.env.GEMINI_APIKEY
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/motivasi", async (req, res) => {
  try {
    const prompt = "Berikan satu kutipan motivasi singkat untuk belajar.";
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    res.json({ motivasi: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ motivasi: "Gagal mengambil motivasi." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
