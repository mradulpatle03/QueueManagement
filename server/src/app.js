const http = require("http");
const dotenv = require("dotenv");
const app = require("./index");
const { initSocket } = require("./socket");

dotenv.config();

const server = http.createServer(app);

// ✅ initialize socket.io 
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});
