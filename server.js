const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]); //  fixes DNS issue

require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});