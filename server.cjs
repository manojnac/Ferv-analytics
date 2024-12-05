// // Import required modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const firebaseAdmin = require("firebase-admin");

// // Initialize the app
// const app = express();
// const port = 3000;
// const cors = require("cors");

// // Use CORS to allow cross-origin requests
// app.use(cors());


// // Use body-parser middleware to handle POST requests
// app.use(bodyParser.json());

// // Initialize Firebase Admin SDK
// const serviceAccount = require("./serviceAccountKey.json");

// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAccount),
//     databaseURL: "https://swat-173ca-default-rtdb.firebaseio.com", // replace with your Firebase DB URL
// });

// // Get a reference to the Realtime Database
// const db = firebaseAdmin.database();

// // POST route for storing the URL
// app.post("/store-url", async (req, res) => {
//     const { url } = req.body;
//     if (!url) {
//         return res.status(400).json({ success: false, message: "URL is required" });
//     }

//     try {
//         // You can save the URL to your Firebase here if needed
//         // For now, we just log it as an example
//         console.log("Received URL:", url);

//         // You could also save it to Firebase if necessary
//         // const newUrlRef = db.ref("urls").push();
//         // await newUrlRef.set({ url, timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP });

//         res.status(200).json({ success: true, message: "URL data stored successfully!" });
//     } catch (error) {
//         console.error("Error storing URL:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// });


// // Sample route to save traffic data
// app.post("/log", async (req, res) => {
//     const { page, userAgent, referrer, sessionId } = req.body;

//     console.log("Received Page URL:", page);



//     // Ensure all required data is present
//     if (!page || !userAgent || !referrer || !sessionId) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create a log object
//     const logData = {
//         page,
//         userAgent,
//         referrer,
//         sessionId,
//         timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP, // timestamp of the visit
//     };
//     console.log("Traffic Data to Store:", logData);

//     try {
//         // Push the log data to Firebase Realtime Database
//         const newLogRef = db.ref("trafficData/visitorLogs").push();
//         await newLogRef.set(logData);

//         res.status(200).json({ message: "Traffic data logged successfully" });
//     } catch (error) {
//         console.error("Error logging traffic data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Endpoint to fetch traffic analytics (real-time data)
// app.get("/analytics", async (req, res) => {
//     try {
//         // Fetch the total page views, total sessions, and bounce rate
//         const trafficDataRef = db.ref("trafficData/visitorLogs");


//         const snapshot = await trafficDataRef.once("value");
//         const data = snapshot.val();

//         // If no data exists, send a default response
//         if (!data) {
//             return res.status(200).json({
//                 totalPageViews: 0,
//                 totalSessions: 0,
//                 bounceRate: 0,
//                 visitorTrends: [],
//                 cityPageViews: [],
//                 bounceRates: [],
//                 userBehavior: [],
//             });
//         }
//         const totalSessions = Object.keys(data).length;
//         const totalPageViews = calculateTotalPageViews(data); // Implement this function
//         const bounceRate = calculateBounceRate(data); // Implement this function

//         res.status(200).json({
//             totalPageViews,
//             totalSessions,
//             bounceRate,
//             // Other aggregated data
//         });
//     } catch (error) {
//         console.error("Error fetching analytics:", error);
//         res.status(500).json({ error: "Error fetching analytics" });
//     }
// });

// // Server start
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const firebaseAdmin = require("firebase-admin");
const cors = require("cors");
const axios = require("axios");

// Initialize the app
const app = express();
const port = 3000;

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://swat-173ca-default-rtdb.firebaseio.com", // replace with your Firebase DB URL
});

// Get a reference to the Realtime Database
const db = firebaseAdmin.database();

// Function to simulate website traffic data generation
async function simulateTrafficData(url) {
    try {
        // Fetch the website content (to ensure it's valid)
        await axios.get(url);

        // Simulate writing traffic data into Firebase
        const trafficLog = {
            page: url,
            userAgent: "Simulated User Agent",
            referrer: "https://example.com",
            sessionId: "simulated-session-id",
            timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP,
        };

        const newLogRef = db.ref("trafficData/visitorLogs").push();
        await newLogRef.set(trafficLog);

        console.log(`Traffic data logged for URL: ${url}`);
    } catch (error) {
        console.error(`Failed to fetch or log traffic data for URL ${url}:`, error.message);
    }
}

// POST route for storing the URL and simulating traffic
app.post("/store-url", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: "URL is required" });
    }

    try {
        console.log("Received URL:", url);

        // Simulate traffic data generation for the URL
        await simulateTrafficData(url);

        res.status(200).json({ success: true, message: "URL data stored successfully!" });
    } catch (error) {
        console.error("Error processing URL:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Log traffic data (optional endpoint, for manual data simulation)
app.post("/log", async (req, res) => {
    const { page, userAgent, referrer, sessionId } = req.body;

    if (!page || !userAgent || !referrer || !sessionId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const logData = {
        page,
        userAgent,
        referrer,
        sessionId,
        timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP,
    };

    try {
        const newLogRef = db.ref("trafficData/visitorLogs").push();
        await newLogRef.set(logData);

        res.status(200).json({ message: "Traffic data logged successfully" });
    } catch (error) {
        console.error("Error logging traffic data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Helper function to calculate the bounce rate
function calculateBounceRate(data) {
    const sessions = {};

    // Group logs by sessionId
    for (const key in data) {
        const { sessionId } = data[key];

        if (!sessions[sessionId]) {
            sessions[sessionId] = 0;
        }
        sessions[sessionId]++;
    }

    // Count single-page sessions
    const singlePageSessions = Object.values(sessions).filter((visits) => visits === 1).length;

    // Total sessions
    const totalSessions = Object.keys(sessions).length;

    // Calculate bounce rate
    const bounceRate = (singlePageSessions / totalSessions) * 100;

    return bounceRate.toFixed(2); // Return rounded to two decimal places
}

// Analytics endpoint (fetch real-time data)
app.get("/analytics", async (req, res) => {
    try {
        const trafficDataRef = db.ref("trafficData/visitorLogs");
        const snapshot = await trafficDataRef.once("value");
        const data = snapshot.val();

        if (!data) {
            return res.status(200).json({
                totalPageViews: 0,
                totalSessions: 0,
                bounceRate: 0,
            });
        }

        const totalSessions = Object.keys(data).length;
        const totalPageViews = Object.keys(data).length; // Simplified; adjust logic as needed
        const bounceRate = calculateBounceRate(data);
        // Replace with real calculation logic

        res.status(200).json({
            totalPageViews,
            totalSessions,
            bounceRate,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Error fetching analytics" });
    }
});

// Server start
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

