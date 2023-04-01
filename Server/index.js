const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/userRoutes");
const msgRouter = require("./routes/msgRoutes");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const corsOptions = {
  origin: ["http://localhost:3000", "https://api.multiavatar.com/45678945"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/msg", msgRouter);

const server = app.listen(process.env.PORT, () => {
  console.log("Server started at Port " + process.env.PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineusers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineusers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineusers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
