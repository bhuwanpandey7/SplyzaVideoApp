// index.js
const express = require("express");
const os = require("os");
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const db = new sqlite3.Database('database.db');
app.use(bodyParser.json());

// Create a table for video reactions (You can customize this schema as needed)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS video_reactions (
      id INTEGER PRIMARY KEY,
      videoId TEXT,
      type TEXT,
      timeframe REAL,
      dataUri TEXT
    )
  `);
});

// Sample data for videos
const videos = [
  {
    id: 1,
    title: "Sample Video 1",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 1",
  },
  {
    id: 2,
    title: "Sample Video 2",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 2",
  },
  {
    id: 3,
    title: "Sample Video 3",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 3",
  },
  {
    id: 4,
    title: "Sample Video 4",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 4",
  },
  {
    id: 5,
    title: "Sample Video 5",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 5",
  },
  {
    id: 6,
    title: "Sample Video 6",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 6",
  },
  {
    id: 7,
    title: "Sample Video 7",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 7",
  },
  {
    id: 8,
    title: "Sample Video 8",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 8",
  },
  {
    id: 9,
    title: "Sample Video 9",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 9",
  },
  {
    id: 10,
    title: "Sample Video 10",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 10",
  },
  {
    id: 11,
    title: "Sample Video 11",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 11",
  },
  {
    id: 12,
    title: "Sample Video 12",
    createdDate: "12/04/2018",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Description for Sample Video 12",
  },
];

// Create a table for video details (You can customize this schema as needed)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS video_details (
      id INTEGER PRIMARY KEY,
      title TEXT,
      createdDate TEXT,
      videoUrl TEXT,
      description TEXT
    )
  `);

  // Function to save videos to the database
  function saveVideosToDatabase() {
    const stmt = db.prepare('INSERT INTO video_details (title, createdDate, videoUrl, description) VALUES (?, ?, ?, ?)');
    videos.forEach((video) => {
      stmt.run(video.title, video.createdDate, video.videoUrl, video.description);
    });

    stmt.finalize();
  }

  // Call the function to save videos to the database
  saveVideosToDatabase();
});

// Enable CORS (for local development)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Define API routes
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

app.get("/api/users/self", (req, res) => {
  // Get the username of the currently logged-in machine user
  const username = os.userInfo().username;

  // Return the username in the response
  res.json({ username });
});

const reactions = {
  1: [],
  2: [],
};

// Get video details by videoId
// app.get("/api/videos/:videoId", (req, res) => {
//   const videoId = parseInt(req.params.videoId);
//   const video = videos.find((v) => v.id === videoId);
//   if (!video) {
//     return res.status(404).json({ message: "Video not found" });
//   }
//   res.json(video);
// });

// GET request to retrieve video details
app.get('/api/videos/:videoId', (req, res) => {
  const videoId = req.params.videoId;


  // Example query to fetch video details from the database
  db.get('SELECT * FROM video_details WHERE id = ?', [videoId], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }
    // Return the video details
    const videoDetails = {
      id: row.id,
      title: row.title,
      createdDate: row.createdDate,
      videoUrl: row.videoUrl,
      description: row.description
      // Add other video details here
    };
    res.json(videoDetails);
  });
});

// Get reactions for a video by videoId
app.get("/api/videos/:videoId/reactions", (req, res) => {
  const videoId = parseInt(req.params.videoId);
  const videoReactions = reactions[videoId] || [];
  res.json(videoReactions);
});

// PATCH request to update video title
app.patch('/api/videos/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const { title } = req.body;

  // Update the video title in your data source (e.g., a database)
  // Replace this with your actual update code

  db.run('UPDATE video_details SET title = ? WHERE id = ?', [title, videoId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Video title updated successfully' });
  });
});

// POST request to add a new reaction
app.post('/api/videos/:videoId/reactions', (req, res) => {
  const videoId = req.params.videoId;
  const { type, timeframe, dataUri } = req.body;

  // Insert the reaction into the database
  const stmt = db.prepare('INSERT INTO video_reactions (videoId, type, timeframe, dataUri) VALUES (?, ?, ?, ?)');
  stmt.run(videoId, type, timeframe, dataUri);
  stmt.finalize();

  // Return the saved reaction data
  const savedReaction = {
    videoId: videoId,
    type: type,
    timeframe: timeframe,
    dataUri: dataUri,
  };

  res.status(201).json(savedReaction);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
