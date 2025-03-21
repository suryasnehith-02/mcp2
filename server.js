require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


app.get("/", (req, res) => {
  res.json({ message: "MCP Twitter API Server Running!" });
});


app.get("/tweets", async (req, res) => {
  await sleep(1000); 

  const query = req.query.query || "AI"; 
  const count = req.query.count || 1; 

  try {
    const response = await axios.get("https://api.twitter.com/2/tweets/search/recent", {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        query: query,
        max_results: count,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
});
