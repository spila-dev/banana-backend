import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const verify = async (req, res) => {
  const {
    authData: {
      data: {
        payload: { tokenId },
      },
    },
  } = req;
  const client = await temporaryClients.find(tokenId);

  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);

  if (foundUser) {
    await removeTemporaryClient(tokenId);

    const token = signToken(foundUser.userId);
    authManager.setTokenToResponse(res, token);
    await addNewSession(foundUser.userId, token);

    return {
      newUser: false,
    };
  }

  return {
    newUser: true,
  };
};

const signToken = (tokenId) => {
  return authManager.signToken(
    {
      tokenId,
      date: Date.now(),
    },
    authManager.getMainSecret()
  );
};

const addNewSession = async (userId, newToken) => {
  await services.addNewSession().run({
    newToken,
    userId,
  });
};

const removeTemporaryClient = async (tokenId) => {
  await temporaryClients.remove(tokenId);
};

export { verify };