// app.js
const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

const key = process.env.IPSTACK_API_KEY;

// Setup Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Replace with your actual API key
app.use(bodyParser.json());

app.get("/", async(req, res) => {
    try {
        async function getClientIp(req) {
            try {
                const response = await axios.get("https://api.ipify.org?format=json");
                return response.data.ip;
            } catch (error) {
                console.error("Error fetching client IP:", error);
                return null;
            }
        }

        const ip = await getClientIp(req);
        if (!ip) {
            throw new Error("Unable to fetch client IP");
        }

        for (let i = 0; i < Object.keys(ip).length; i++) {
            console.log(Object.keys(ip)[i] + " : " + Object.values(ip)[i]);
        }

        const response = await axios.get(
            `http://api.ipstack.com/${ip}?access_key=2021aa2a34c2699161cd5d0967128bde`
        );
        res.render("home", { ipData: response.data });
    } catch (error) {
        console.error("Error fetching IP data:", error);
        res.render("home", { error: "Unable to fetch IP data" });
    }
});

app.post("/log-browser-data", (req, res) => {
    const browserData = req.body;
    const clientIp =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    console.log("Received browser data:", browserData);
    console.log("Client IP address:", clientIp);

    // Here you can log the data to a file, database, etc.
    // For demonstration, we'll just send a success response
    res.json({ status: "success", data: browserData, ip: clientIp });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});