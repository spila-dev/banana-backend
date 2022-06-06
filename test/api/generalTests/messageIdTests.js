const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  chatModels: { messageIdModel },
} = require("@/models/chatModels/chatModels");

const messageIdSuccessTests = (
  { messageIdMain, messageIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(messageIdModel, messageIdMain, messageIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const messageIdFailureTests = () => {};

module.exports = {
  messageIdSuccessTests,
  messageIdFailureTests,
};