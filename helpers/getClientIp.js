const axios = require("axios");

async function getClientIp(req) {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching client IP:", error);
    return null;
  }
}

module.exports = getClientIp;
