const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (message) => {
    const response = `ChatBot: ${message}`;
    socket.emit("botMeesage", response);
  });
});

const port = process.env.PORT || 3333;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
