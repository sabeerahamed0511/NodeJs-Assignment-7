require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stdRouter = require("./routes/student");
const PORT = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
mongoose.connect(process.env.DATABASE_URL)
.then(res => {
    console.log("Connected to DB...")
}).catch(() => console.log("Not connected..."))

app.use("/",stdRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

// module.exports = app;   