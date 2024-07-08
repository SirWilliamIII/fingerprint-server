const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const getClientIp = require("./helpers/getClientIp");
const app = express();

const key = process.env.IPSTACK_API_KEY;
const port = process.env.PORT || 3000;

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

    if (!ip) {
      throw new Error("Unable to fetch client IP");
    }

    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${key}`
    );
    console.log(response.data);

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
