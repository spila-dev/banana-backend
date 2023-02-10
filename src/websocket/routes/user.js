const { socketRouteBuilder } = require("@/classes/RouteBuilder");

const builder = socketRouteBuilder();

const disconnect = builder.create().event("disconnect").build();

const updateOnlineStatus = builder.create().event("updateOnlineStatus").build();

const userRoutes = {
  disconnect,
  updateOnlineStatus,
};

module.exports = {
  userRoutes,
};