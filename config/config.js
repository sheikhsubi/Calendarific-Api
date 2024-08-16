require("dotenv").config();
module.exports = {
  apiKey: process.env.CALENDARIFIC_API_KEY,
  baseUrl: process.env.CALENDARIFIC_BASE_URL,
  cacheTTL: process.env.CACHE_TTL || 3600,
};
