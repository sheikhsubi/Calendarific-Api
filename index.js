const express = require("express");
const holidayRoutes = require("./routes/holiday.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", holidayRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
