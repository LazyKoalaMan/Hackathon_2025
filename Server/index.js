import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// helper function to fetch a web page
async function fetchPageHTML(url) {
  const response = await fetch(url);
  return await response.text();
}

app.post("/api/search-jobs", async (req, res) => {
  const { query } = req.body;

  try {
    // Instead of Selenium, call DuckDuckGo directly
    const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const html = await fetchPageHTML(searchUrl);

    // Simple regex for hrefs
    const hrefs = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"]+)"/g)]
      .map(m => m[1])
      .slice(0, 2);

    const pages = [];
    for (const link of hrefs) {
      const pageHTML = await fetchPageHTML(link);
      pages.push(pageHTML);
    }

    // Ask Gemini to extract job data
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const results = [];
    for (let i = 0; i < pages.length; i++) {
      const prompt = `
      Extract job listings from this text.
      Format each as:
      { title, company, location, requirements, link }

      Page content:
      """${pages[i].slice(0, 20000)}"""
      `;
      const result = await model.generateContent(prompt);
      results.push(result.response.text());
    }

    res.json({ jobs: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch job listings" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
