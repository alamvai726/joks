const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/joke", (req, res) => {
  const jokeFilePath = path.join(__dirname, "jok.json");

  fs.readFile(jokeFilePath, "utf8", (err, jokeData) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Error reading jok.json"
      });
    }

    try {
      const jokes = JSON.parse(jokeData);
      if (!Array.isArray(jokes) || jokes.length === 0) {
        return res.status(500).json({
          status: "failed",
          error: "No jokes found in jok.json"
        });
      }

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

      res.json({
        status: "success",
        joke: randomJoke,
        author: {
          name: "MOHAMMAD-JUBAYER",
          facebook: "https://www.facebook.com/profile.php?id=61573052122735"
        }
      });
    } catch (parseError) {
      res.status(500).json({
        status: "failed",
        error: "Error parsing jok.json"
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Joke API running on port ${PORT}`);
});
