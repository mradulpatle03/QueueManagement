const http = require("http");
const { Server } = require("socket.io");
const app = require("./index.js");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  },
});

io.on("connection",(socket)=>{
    console.log("Socket connected:", socket.id);

    socket.on("disconnect",()=>{
        console.log("Socket disconnected:", socket.id);
    });
})

module.exports = { io };
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`REAl Server running on port ${PORT}`);
});