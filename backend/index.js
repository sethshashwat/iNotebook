const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();

connectToMongo();
const app = express()
const port = 4000;

app.use(cors())
app.use(express.json())

//Available routes
app.get("/", (req, res) => {
  res.send("Default Route Works!");
  })
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNoteboook backend listening on port ${port}`)
})


