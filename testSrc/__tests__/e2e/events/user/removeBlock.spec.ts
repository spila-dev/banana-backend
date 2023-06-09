import { services } from "~/services";
import { UserId } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("removeContact successful test", () => {
  it("should add users to blacklist", async () => {
    const blacklistLength = 10;
    const userIds = await createUserIds(blacklistLength);

    const { user: currentUser, socket } = await randomMaker.user();

    const addBlockRequester = helpers.requesterCollection.addBlock(socket);

    for (const userId of userIds) {
      await addBlockRequester.sendFullFeaturedRequest({ userId });
    }

    const removeBlockRequester =
      helpers.requesterCollection.removeBlock(socket);

    for (const blacklistItem of [...userIds]) {
      const {
        data: { removedBlock },
      } = await removeBlockRequester.sendFullFeaturedRequest({
        userId: blacklistItem,
      });

      assertionInitializerHelper().userId({
        testValue: removedBlock.userId,
        equalValue: blacklistItem,
      });

      userIds.shift();
      await testBlacklistAfterRemoveOneItem(currentUser.userId, userIds);
    }

    await testBlacklistAfterRemoveAll(currentUser.userId);
  });
});

await helpers.asyncDescribe("removeBlock fail tests", async () => {
  const { requester, user } = await helpers.setupRequester(
    helpers.requesterCollection.removeBlock
  );

  return () => {
    const selfStuffData = {
      userId: user.userId,
    };

    const random = { userId: randomMaker.userId() };

    e2eFailTestInitializerHelper(requester)
      .input(random)
      .selfStuff(selfStuffData)
      .userId(random)
      .blacklistItemNotExist(random);
  };
});

const createUserIds = async (length: number) => {
  const users = await randomMaker.users(length);
  return users.map((i) => i.user.userId);
};

const testBlacklistAfterRemoveOneItem = async (
  currentUserId: UserId,
  blacklist: string[]
) => {
  const blacklistAfterRemove = await findBlacklist(currentUserId);
  expect(blacklistAfterRemove.length).toBe(blacklist.length);

  blacklist.forEach((i) => {
    const foundUserId = blacklistAfterRemove.find(
      (j) => i === j.userId
    )?.userId;

    expect(i).toBe(foundUserId);
  });
};

const testBlacklistAfterRemoveAll = async (userId: UserId) => {
  const blacklistAfterRemoveAll = await findBlacklist(userId);
  expect(blacklistAfterRemoveAll.length).toBe(0);
};

const findBlacklist = async (userId: UserId) => {
  const { blacklist } = (await services.findOneUserById({ userId }))!;
  return blacklist;
};
