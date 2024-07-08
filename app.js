require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const getClientIp = require("./helpers/getClientIp"); // Adjust the path as necessary

const app = express();

const vID = "2FgZMaeTJbVKRBYweA7H";

const key = process.env.IPSTACK_API_KEY;
const port = process.env.PORT || 3000;

const {
  FingerprintJsServerApiClient,
  Region,
} = require("@fingerprintjs/fingerprintjs-pro-server-api");

const client = new FingerprintJsServerApiClient({
  apiKey: key,
  region: Region.Global,
});

// Setup Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Replace with your actual API key
app.use(bodyParser.json());

// async function fetchVisitorHistory(visitorId, req) {
//   const apiKey = client.apiKey; // Replace with your actual API key
//   const baseUrl = "https://api.fpjs.io"; // Base URL for the FingerprintJS Pro API
//   const userAgent = req.headers["user-agent"];
//   // Define your query parameters
//   const queryParams = {
//     visitorId: visitorId, // Assuming visitorId is the parameter you need to pass
//     limit: 5, // Example additional parameter
//     start: 0, // Example additional parameter
//   };
//   let response;
//   try {
//     // Make the API call with query parameters
//     response = await client.fetch(`${baseUrl}/visitors`, {
//       params: queryParams,
//       headers: {
//         Authorization: `Bearer ${apiKey}`, // Assuming the API uses Bearer token authentication
//       },
//     });

//     // Process the response
//   } catch (error) {
//     console.error("Error fetching visitor data:", error);
//   }
// }

app.get("/", async (req, res) => {
  try {
    const ip = await getClientIp(req);
    if (!ip) {
      throw new Error("Unable to fetch client IP");
    }

    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${key}`
    );

    res.render("home", {
      ipData: response.data,
    });
  } catch (error) {
    console.error("Error fetching IP data:", error);
    res.render("home", { error: "Unable to fetch IP data" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
