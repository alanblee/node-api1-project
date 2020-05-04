const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config routes
const userRoutes = require("./api/routes/userRoutes");

//use routes
app.use("/api/users", userRoutes);

//port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
