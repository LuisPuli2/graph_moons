const express = require("express");
const http = require("http");
const cors = require('cors');
const data = require("./graph_data")

const port = process.env.PORT || 4001;

const app = express();
app.use(cors())

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(data.graph_data);
});


server.listen(port, () => console.log(`Listening on port ${port}`));