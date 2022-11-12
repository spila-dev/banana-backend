const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;

const chatId = (configuredCustomRequest, data = {}) => {
  failTestBuilder
    .create(configuredCustomRequest, data, chatModels.chatId, "chatId")
    .required(errors.CHAT_ID_REQUIRED)
    .minlength(errors.CHAT_ID_MIN_LENGTH_REACH)
    .maxlength(errors.CHAT_ID_MAX_LENGTH_REACH)
    .invalidType_typeIsString(errors.CHAT_ID_INVALID_TYPE);
};
module.exports = {
  chatId,
};
