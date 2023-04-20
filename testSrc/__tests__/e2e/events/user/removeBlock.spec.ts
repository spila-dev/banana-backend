import chai from "chai";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { UserMongo } from "@/types";

describe("removeContact successful test", () => {
  it("should add users to blacklist", async () => {
    const blacklistLength = 10;
    const userIds = await createUserIds(blacklistLength);

    const { user: currentUser, socket } = await randomMaker.user();

    const addBlockRequester = helpers.requesters.addBlock(socket);

    for (const userId of userIds) {
      await addBlockRequester.sendFullFeaturedRequest({ userId });
    }

    const removeBlockRequester = helpers.requesters.removeBlock(socket);

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
    helpers.requesters.removeBlock
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
  currentUserId: string,
  blacklist: string[]
) => {
  const blacklistAfterRemove = await findBlacklist(currentUserId);
  chai.expect(blacklistAfterRemove.length).to.be.equal(blacklist.length);

  blacklist.forEach((i) => {
    const foundUserId = blacklistAfterRemove.find(
      (j) => i === j.userId
    )?.userId;

    chai.expect(i).to.be.equal(foundUserId);
  });
};

const testBlacklistAfterRemoveAll = async (userId: string) => {
  const blacklistAfterRemoveAll = await findBlacklist(userId);
  chai.expect(blacklistAfterRemoveAll.length).to.be.equal(0);
};

const findBlacklist = async (userId: string) => {
  const { blacklist } = (await services.findOneUserById(userId)) as UserMongo;
  return blacklist;
};