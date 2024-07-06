// index.js

require("dotenv").config({ path: "./.env" });

console.log("what:", process.env.IPSTACK_API_KEY);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DATABASE_PASSWORD:", process.env.DATABASE_PASSWORD);
console.log("EMAIL_ID:", process.env.EMAIL_ID);
console.log("STRIPE_API_KEY:", process.env.STRIPE_API_KEY);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
