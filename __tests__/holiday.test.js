const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const config = require("../config/config");
const { getHolidays, getCountries } = require("../controllers/holiday");

const mock = new MockAdapter(axios);

describe("API Tests", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("GET /holidays", () => {
    it("should return holidays when data is fetched successfully", async () => {
      const req = {
        query: {
          country: "PAK",
          year: "2024",
        },
      };

      const holidaysResponse = {
        response: {
          holidays: [
            { date: "2024-01-01", name: "New Year's Day" },
            { date: "2024-12-25", name: "Christmas Day" },
          ],
        },
      };

      mock.onGet(`${config.baseUrl}/holidays`).reply(200, holidaysResponse);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      await getHolidays(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(holidaysResponse.response.holidays);
    });

    it("should return 400 error when country or year parameter is missing", async () => {
      const req = {
        query: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await getHolidays(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        error: "Country and year parameters are required",
      });
    });

    it("should return a 500 error when a simulated server error occurs", async () => {
      const req = {
        query: {
          country: "TEST_ERROR",
          year: "2024",
        },
      };
      mock.onGet(`${config.baseUrl}/holidays`).reply(500);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getHolidays(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch holidays",
      });
    });
  });

  describe("API Tests for getCountries", () => {
    it("should return countries when data is fetched successfully", async () => {
      const req = {};

      const countriesResponse = {
        response: {
          countries: [
            { code: "US", name: "United States" },
            { code: "CA", name: "Canada" },
          ],
        },
      };

      mock.onGet(`${config.baseUrl}/countries`).reply(200, countriesResponse);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCountries(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(
        countriesResponse.response.countries
      );
    });

    it("should return a 500 error when the axios request fails", async () => {
      const req = {};

      mock.onGet(`${config.baseUrl}/countries`).reply(500);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCountries(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch countries",
      });
    });
  });
});
