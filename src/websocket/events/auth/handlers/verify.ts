import { clientStore } from "~/classes/ClientStore";
import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";
import { SocketOnHandler, VerifyIO } from "~/types";

export const verify: SocketOnHandler<VerifyIO> = async (socket) => {
  const client = (await clientStore.find(socket.clientId))!;

  const cellphone = userUtils.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) {
    await addClient(foundUser.userId, socket.clientId);
    clientStore.update(socket.clientId, {
      ...client,
      userId: foundUser.userId,
    });

    return {
      data: {
        newUser: false,
      },
    };
  }

  return {
    data: {
      newUser: true,
    },
  };
};

const addClient = async (userId: string, clientId: string) => {
  await services.addClient({
    clientId,
    userId,
  });
};
