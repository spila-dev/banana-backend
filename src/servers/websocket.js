const socket = require("socket.io");

const { middlewares } = require("@/websocket/middlewares");

const { events } = require("@/websocket/events");
const { customMethods } = require("@/websocket/custom/methods");

const websocketServer = (httpServer) => {
  const io = new socket.Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.customUse = customMethods.use(socket);
    socket.customOn = customMethods.on(socket);

    socket.customUse(middlewares.checkEventAvailability);
    socket.customUse(middlewares.auth);
    socket.customUse(middlewares.checkDataFields);
    socket.customUse(middlewares.checkCurrentUserStatus);
    socket.customUse(middlewares.attachCurrentUserId);

    events(socket, io);
  });
  return io;
};

module.exports = {
  websocketServer,
};