import { randomMaker } from "utility-store";
import { UserId } from "utility-store/lib/types";

import { models } from "~/models";
import { createPrivateChat } from "~/services/chat/createPrivateChat";
import { findOnePrivateChat } from "~/services/chat/findOnePrivateChat";
import { commonServices } from "~/services/common";
import { MessageItem, MessageText, PrivateChatData } from "~/types/datatypes";
import { HydratedPrivateChat } from "~/types/models";
import { errors } from "~/variables";

const chatModels = models.native;

//REFACTOR: Separate createPrivateChat parts
const sendPrivateMessage = async (data: {
  currentUserId: UserId;
  messageText: MessageText;
  participantId: UserId;
}) => {
  const targetParticipantId = await findTargetParticipantId(data.participantId);

  const addedMessage = createNewMessage(data.messageText, data.currentUserId);

  const privateChat = await findPrivateChat(
    data.currentUserId,
    targetParticipantId
  );
  const fixedPrivateChat = await fixPrivateChat({
    currentUserId: data.currentUserId,
    privateChat,
    targetParticipantId,
  });

  await saveMessageOnPrivateChat({
    addedMessage,
    privateChat: fixedPrivateChat,
  });

  return {
    chatId: fixedPrivateChat.chatId,
    addedMessage,
  };
};

const findTargetParticipantId = async (participantId: string) => {
  const targetParticipant = await commonServices.findOneUserById(participantId);

  if (!targetParticipant) throw errors.targetUserNotExist;

  return targetParticipant.userId;
};

const findPrivateChat = async (
  currentUserId: string,
  targetParticipantId: string
) => {
  const prop = "participants.participantId" as keyof PrivateChatData;

  return await findOnePrivateChat({
    [prop]: {
      $all: [currentUserId, targetParticipantId],
    },
  });
};

const createNewMessage = (messageText: string, currentUserId: string) =>
  ({
    createdAt: Date.now(),
    messageText,
    messageId: randomMaker.id(chatModels.messageId.maxLength),
    sender: {
      senderId: currentUserId,
    },
  } as MessageItem);

const fixPrivateChat = async (data: {
  currentUserId: UserId;
  privateChat: HydratedPrivateChat | null;
  targetParticipantId: string;
}) =>
  data.privateChat ||
  (await createPrivateChat({
    chatId: createChatId(),
    createdAt: Date.now(),
    currentParticipantId: data.currentUserId,
    targetParticipantId: data.targetParticipantId,
  }));

const createChatId = () => randomMaker.id(chatModels.chatId.maxLength);

const saveMessageOnPrivateChat = async (data: {
  addedMessage: MessageItem;
  privateChat: HydratedPrivateChat;
}) => {
  data.privateChat.messages.push(data.addedMessage);
  await data.privateChat.save();
};

export { sendPrivateMessage };
