const axios = require("axios");
const NodeCache = require("node-cache");
const config = require("../config/config.js");

const cache = new NodeCache({ stdTTL: config.cacheTTL });
const getHolidays = async (req, res) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res
      .status(400)
      .json({ error: "Country and year parameters are required" });
  }

  const cacheKey = `${country}-${year}`;
  const cachedData = cache.get(cacheKey);
  console.log("cached key", cacheKey);
  console.log("Cached Data:", cachedData);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${config.baseUrl}/holidays`, {
      params: {
        api_key: config.apiKey,
        country,
        year,
      },
    });

    const holidays = response.data.response.holidays || [];
    cache.set(cacheKey, holidays);
    //   console.log("Data Cached:", holidays);

    return res.status(200).json(holidays);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Failed to fetch holidays" });
  }
};

const getCountries = async (req, res) => {
  try {
    const response = await axios.get(`${config.baseUrl}/countries`, {
      params: {
        api_key: config.apiKey,
      },
    });

    const countries = response.data.response.countries;
    return res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

module.exports = { getHolidays, getCountries };
