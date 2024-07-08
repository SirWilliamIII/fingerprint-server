const {
  FingerprintJsServerApiClient,
  Region,
} = require("@fingerprintjs/fingerprintjs-pro-server-api");

const fprintKey = process.env.FINGERPRINT_API_KEY;

const client = new FingerprintJsServerApiClient({
  apiKey: fprintKey,
  region: Region.Global,
});

const vID = "2FgZMaeTJbVKRBYweA7H";

async function fetchVisitorHistory(visitorId) {
  const apiKey = client.apiKey; // Replace with your actual API key
  const baseUrl = "https://api.fpjs.io"; // Base URL for the FingerprintJS Pro API
  const userAgent = req.headers["user-agent"];
  // Define your query parameters
  const queryParams = {
    visitorId: visitorId, // Assuming visitorId is the parameter you need to pass
    limit: 5, // Example additional parameter
    start: 0, // Example additional parameter
    userAgent: userAgent, // Example additional parameter
  };

  try {
    // Make the API call with query parameters
    await client.fetch(`${baseUrl}/visitors`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${apiKey}`, // Assuming the API uses Bearer token authentication
      },
    });

    // Process the response
  } catch (error) {
    console.error("Error fetching visitor data:", error);
  }
}

module.exports = fetchVisitorHistory;
