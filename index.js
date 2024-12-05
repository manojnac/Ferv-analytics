// Load the gapi client
function loadGoogleAPI() {
    return new Promise((resolve, reject) => {
        gapi.load("client:auth2", resolve);
    });
}

// Initialize the client
async function initClient(apiKey, clientId) {
    await loadGoogleAPI();

    await gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest"],
        scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
}

// Sign in and fetch data
async function fetchGoogleAnalyticsData(viewId, startDate, endDate) {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
    }

    const response = await gapi.client.analyticsreporting.reports.batchGet({
        reportRequests: [
            {
                viewId: viewId, // Replace with your GA View ID
                dateRanges: [{ startDate: startDate, endDate: endDate }],
                metrics: [{ expression: "ga:sessions" }, { expression: "ga:pageviews" }],
                dimensions: [{ name: "ga:date" }],
            },
        ],
    });

    return response.result.reports[0].data.rows; // Process data as needed
}

// Usage
(async function main() {
    const apiKey = "YOUR_API_KEY";
    const clientId = "114770560585775143871.apps.googleusercontent.com";
    const viewId = "YOUR_VIEW_ID"; // Replace with the actual view ID
    const startDate = "30daysAgo";
    const endDate = "today";

    try {
        await initClient(apiKey, clientId);
        const analyticsData = await fetchGoogleAnalyticsData(viewId, startDate, endDate);
        console.log("Analytics Data:", analyticsData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
