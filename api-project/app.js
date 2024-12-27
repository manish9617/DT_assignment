const express = require("express");
const multer = require("multer");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// MongoDB configuration
const uri = "mongodb://localhost:27017";
const dbName = "eventsDB";
let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// API Endpoints
// 1. GET /events/:id
app.get("/api/v3/app/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("events");

    const event = await collection.findOne({ _id: new ObjectId(id) });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. GET /events?type=latest&limit=5&page=1
app.get("/api/v3/app/events", async (req, res) => {
  try {
    const { type, limit = 5, page = 1 } = req.query;
    const collection = db.collection("events");

    if (type === "latest") {
      // Fetch events by recency with pagination
      const events = await collection
        .find({})
        .sort({ schedule: -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .toArray();
      return res.json(events);
    }

    res.status(400).json({ error: "Invalid query parameters" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. POST /events
app.post(
  "/api/v3/app/events",
  upload.single("files[image]"),
  async (req, res) => {
    try {
      const {
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
      } = req.body;

      const image = req.file;
      const newEvent = {
        type: "event",
        name,
        tagline,
        schedule: new Date(schedule),
        description,
        files: { image: image ? image.path : null },
        moderator,
        category,
        sub_category,
        rigor_rank: parseInt(rigor_rank),
        attendees: [],
      };

      const collection = db.collection("events");
      const result = await collection.insertOne(newEvent);
      res.json({ id: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// 4. PUT /events/:id
app.put(
  "/api/v3/app/events/:id",
  upload.single("files[image]"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
      } = req.body;

      const image = req.file;
      const updatedEvent = {
        name,
        tagline,
        schedule: new Date(schedule),
        description,
        files: { image: image ? image.path : null },
        moderator,
        category,
        sub_category,
        rigor_rank: parseInt(rigor_rank),
      };

      const collection = db.collection("events");
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedEvent }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ message: "Event updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// 5. DELETE /events/:id
app.delete("/api/v3/app/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("events");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
