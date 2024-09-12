const Queue = require("bull");
require("dotenv").config();
const redisUrl = process.env.REDIS_URL;

// Create a job queue (Redis connection by default at localhost:6379)
const jobQueue = new Queue("image-processing", redisUrl);

// Process jobs from the queue (Worker)
jobQueue.process(async (job) => {
	const { imageUrl } = job.data;
	console.log(`Processing image from URL: ${imageUrl}`);

	// Simulate image processing (this could be an actual task like resizing or filtering)
	await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay

	console.log(`Finished processing image from: ${imageUrl}`);
	return { status: "done" };
});
