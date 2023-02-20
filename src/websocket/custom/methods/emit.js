const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { trier } = require("simple-trier");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/websocket/events");

const customEmit = (socket = socketIntellisense) => {
  return (event, data, ...args) => {
    const foundRoute = arrayOfRoutes.find((item) => item.name === event);

    return trier(customEmit.name)
      .try(tryBlock, data || {}, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data, ...args)
      .catch(catchBlock)
      .run();
  };
};

const tryBlock = (data, inputFields) => {
  const checkResult = ioFieldsChecker(data, inputFields, errors.io.output);

  if (checkResult.ok === false) {
    errorThrower(!checkResult.error || !checkResult.error.reason, {
      ...errors.UNKNOWN_ERROR,
      checkResult,
    });

    throw {
      ...checkResult.error,
      inputFields,
    };
  }
};

const executeIfNoError = (_, socket, event, data, ...args) => {
  socket.emit(event, { data }, ...args);
};

const catchBlock = (error, socket) => {
  socket.emit("error", error);
};

module.exports = { customEmit };
