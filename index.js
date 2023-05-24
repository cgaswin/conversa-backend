const app = require("./app");
require("dotenv").config();

const connectWithDb = require("./config/database");

//connect to database
connectWithDb()

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}...`);
});
