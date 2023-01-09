const { errors } = require("@/variables/errors");

const blacklistItemNotExistFailTest = (configuredRequester, data) => {
  it("should get error: BLACKLIST_ITEM_NOT_EXIST", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_NOT_EXIST
    );
  });
};

const blacklistItemExistFailTest = (configuredRequester, data) => {
  it("should get error: BLACKLIST_ITEM_EXIST", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_EXIST
    );
  });
};

const contactItemNotExistFailTest = (configuredRequester, data) => {
  it("should get error: CONTACT_ITEM_NOT_EXIST", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_NOT_EXIST
    );
  });
};
const contactItemExistFailTest = (configuredRequester, data) => {
  it("should get error: CONTACT_ITEM_EXIST", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_EXIST
    );
  });
};

const targetUserNotExistFailTest = (configuredRequester, data) => {
  it("should get error: TARGET_USER_NOT_EXIST", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TARGET_USER_NOT_EXIST
    );
  });
};

module.exports = {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
};