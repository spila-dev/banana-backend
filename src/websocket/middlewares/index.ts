import { Socket } from "socket.io";

import { eventsWithoutAuth } from "~/websocket/events";
import { applyMiddlewares } from "~/websocket/middlewares/applyMiddlewares";
import { attachClientId } from "~/websocket/middlewares/attachClientId";
import { attachClientStr } from "~/websocket/middlewares/attachClientStr";
import { attachUserId } from "~/websocket/middlewares/attachUserId";
import { checkClient } from "~/websocket/middlewares/checkClient";
import { checkCurrentClient } from "~/websocket/middlewares/checkCurrentClient";
import { checkCurrentUser } from "~/websocket/middlewares/checkCurrentUser";
import { checkDataFields } from "~/websocket/middlewares/checkDataFields";
import { checkEventAvailability } from "~/websocket/middlewares/checkEventAvailability";
import { dynamicValidator } from "~/websocket/middlewares/dynamicValidator";
import { ignoreMiddlewares } from "~/websocket/middlewares/ignoreMiddlewares";
import { selfStuffCheck } from "~/websocket/middlewares/selfStuffCheck";
import { validateClientId } from "~/websocket/middlewares/validateClientId";
import { verifyClient } from "~/websocket/middlewares/verifyClient";
import { verifyVerificationCode } from "~/websocket/middlewares/verifyVerificationCode";

export const registerMiddlewares = (socket: Socket) => {
  socket.customUse(attachClientStr);
  socket.customUse(verifyClient);
  socket.customUse(attachClientId);
  socket.customUse(validateClientId);

  socket.customUse(checkEventAvailability);

  socket.customUse(
    ignoreMiddlewares(
      eventsWithoutAuth.map((i) => i.name),
      checkClient
    )
  );

  socket.customUse(checkDataFields);
  socket.customUse(dynamicValidator);

  socket.customUse(
    ignoreMiddlewares(
      ["createNewUser", "getStuff", "signIn", "verify"],
      attachUserId,
      checkCurrentUser,
      checkCurrentClient
    )
  );

  socket.customUse(applyMiddlewares("verify", verifyVerificationCode));

  socket.customUse(
    applyMiddlewares(
      ["addBlock", "addContact", "editContact", "removeBlock", "removeContact"],
      selfStuffCheck
    )
  );
};
