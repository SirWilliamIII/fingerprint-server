const {
  FingerprintJsServerApiClient,
  Region,
} = require("@fingerprintjs/fingerprintjs-pro-server-api");

async function fetchVisitorHistory(visitorId, req) {
  const client = new FingerprintJsServerApiClient({
    apiKey: process.env.FINGERPRINTJS_API_KEY,
    region: Region.Global,
  });

  const vID = "2FgZMaeTJbVKRBYweA7H";

  const apiKey = client.apiKey; // Replace with your actual API key
  const baseUrl = "https://api.fpjs.io/"; // Base URL for the FingerprintJS Pro API
  const userAgent = req.headers["user-agent"];
  // Define your query parameters

  try {
    // Make the API call with query parameters
    await client.fetch(`${baseUrl}/visitors/${vID}?api_key=${client.apiKey}`, {
      // Assuming the API uses Bearer token authentication
    });

    // Process the response
  } catch (error) {
    console.error("Error fetching visitor data:", error);
  }
}

module.exports = fetchVisitorHistory;
