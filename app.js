require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const getClientIp = require("./helpers/getClientIp"); // Adjust the path as necessary

const app = express();

const key = process.env.IPSTACK_API_KEY;
const port = process.env.PORT || 3000;
console.log("key:", key);

// Setup Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Replace with your actual API key
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const ip = await getClientIp(req);
    console.log("ip", ip);
    if (!ip) {
      throw new Error("Unable to fetch client IP");
    }

    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${key}`
    );
    console.log("response", response.data.location);
    res.render("home", {
      ipData: response.data,
    });
  } catch (error) {
    console.error("Error fetching IP data:", error);
    res.render("home", { error: "Unable to fetch IP data" });
  }
});

// app.post("/log-browser-data", (req, res) => {
//   const browserData = req.body;
//   const clientIp =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress;

//   console.log("Received browser data:", browserData);
//   console.log("Client IP address:", clientIp);

//   // Here you can log the data to a file, database, etc.
//   // For demonstration, we'll just send a success response
//   res.json({ status: "success", data: browserData, ip: clientIp });
// });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
