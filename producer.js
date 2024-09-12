// producer.js
const express = require("express");
const Queue = require("bull");
require("dotenv").config();

const redisUrl = process.env.REDIS_URL;
console.log("rr", redisUrl);

// Create a job queue (Redis connection by default at localhost:6379)
const jobQueue = new Queue("image-processing", redisUrl);

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
	res.json({ message: "ready" });
});

// Endpoint to add jobs to the queue
app.post("/process-image", (req, res) => {
	const { imageUrl } = req.body;

	// Add the image processing job to the queue
	jobQueue.add({ imageUrl });

	res.json({ message: "Job added to the queue for processing", imageUrl });
});

const appPort = process.env.APP_PORT;

// Start Express server
app.listen(appPort, () => {
	console.log(`Job queue server running on port ${appPort}`);
});
