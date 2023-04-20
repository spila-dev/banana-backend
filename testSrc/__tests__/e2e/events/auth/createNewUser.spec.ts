import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { authHelper } from "$/classes/AuthHelper";
import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { Cellphone, Client, FullName, Session, UserMongo } from "@/types";

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    await testCreatedUserSession(helper.getClientId());

    const { data } = await helpers.requesters
      .getUserData(helper.getClientSocket())
      .sendFullFeaturedRequest();

    testCreatedUserData(data.user, cellphone, fullName);
  });
});

await helpers.asyncDescribe("createNewUser fail tests", async () => {
  const cellphone = randomMaker.unusedCellphone();
  const helper = authHelper(cellphone);
  await helper.signIn();
  await helper.verify();
  const requester = helpers.requesters.createNewUser(helper.getClientSocket());

  return () => {
    const fullName = randomMaker.fullName();
    e2eFailTestInitializerHelper(requester)
      .input(fullName)
      .firstName(fullName)
      .lastName(fullName);
  };
});

const testCreatedUserSession = async (clientId: string) => {
  const { session } = (await clientStore.find(clientId)) as Client;

  const verifiedSession = authManager.verify(session);
  const userId = userUtilities.getUserIdFromVerified(verifiedSession);
  const foundSession = (await getSavedUserSession(userId, session)) as Session;

  assertionInitializerHelper().authentication({
    equalValue: foundSession.session,
    testValue: session,
    secret: authManager.getMainSecret(),
  });
};

const getSavedUserSession = async (userId: string, session: string) => {
  const savedUser = (await getSavedUser(userId)) as UserMongo;
  return savedUser.sessions.find((i) => i.session === session);
};
const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (
  user: UserMongo,
  cellphone: Cellphone,
  fullName: FullName
) => {
  const requestUserData = {
    ...userUtilities.defaultUserData(),
    ...cellphone,
    ...fullName,
  };

  assertionInitializerHelper()
    .bio({ equalValue: requestUserData.bio, testValue: user.bio })
    .blacklist({
      equalValue: requestUserData.blacklist,
      testValue: user.blacklist,
    })
    .cellphone({
      equalValue: requestUserData,
      testValue: user,
    })
    .contacts({
      equalValue: requestUserData.contacts,
      testValue: user.contacts,
    })
    .fullName({
      equalValue: requestUserData,
      testValue: user,
    })
    .userId(
      { testValue: user.userId },
      { stringEquality: false, modelCheck: true }
    )
    .username({
      equalValue: requestUserData.username,
      testValue: user.username,
    });
};