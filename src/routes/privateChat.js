const { ioFieldMaker } = require("@/classes/IoFieldMaker");
const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

const privateChatRouteBuilder = routeBuilder(baseUrls.privateChat);

const getChatsLastMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getChatsLastMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Get chats last message")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const getPrivateChat = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getPrivateChat")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get all messages")
  .inputFields([
    { chatId: ioFieldMaker.create().type(ioFieldTypes.chatId).build() },
  ])
  .outputFields([
    {
      privateChat: ioFieldMaker
        .create()
        .type(ioFieldTypes.privateChat)
        .value({
          chatId: ioFieldMaker.create().type(ioFieldTypes.chatId).build(),
          messages: ioFieldMaker
            .create()
            .type(ioFieldTypes.messages)
            .value([
              {
                message: ioFieldMaker
                  .create()
                  .type(ioFieldTypes.message)
                  .build(),
                messageId: ioFieldMaker
                  .create()
                  .type(ioFieldTypes.messageId)
                  .build(),
                messageSender: ioFieldMaker
                  .create()
                  .type(ioFieldTypes.messageSender)
                  .value({
                    senderId: ioFieldMaker
                      .create()
                      .type(ioFieldTypes.senderId)
                      .build(),
                  })
                  .build(),
              },
            ])
            .build(),
          participants: ioFieldMaker
            .create()
            .type(ioFieldTypes.participants)
            .value([
              {
                participantId: ioFieldMaker
                  .create()
                  .type(ioFieldTypes.participantId)
                  .build(),
              },
            ])
            .build(),
        })
        .build(),
    },
  ])
  .build();

const sendPrivateMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/sendPrivateMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for send private messages")
  .inputFields([
    {
      message: ioFieldMaker.create().type(ioFieldTypes.message).build(),
      participantId: ioFieldMaker
        .create()
        .type(ioFieldTypes.participantId)
        .build(),
    },
  ])
  .outputFields([
    {
      chatId: ioFieldMaker.create().type(ioFieldTypes.chatId).build(),
      newMessage: ioFieldMaker.create().type(ioFieldTypes.newMessage).build(),
    },
  ])
  .build();

const routes = {
  getChatsLastMessage,
  getPrivateChat,
  sendPrivateMessage,
};

const privateChat = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  privateChat,
};
