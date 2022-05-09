const {
  expect,
  getTestUsersFromState,
  setTestUserAndTestToken,
} = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { CustomRequest } = require("@/functions/helpers/CustomRequest");

const {
  cellphoneRoutes: { cellphoneRouteBaseUrl, addBlockRoute },
} = require("@/variables/routes/cellphoneRoutes");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");
const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

const {
  userErrors: { BLACKLIST_ITEM_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");

const {
  userModels: { phoneNumberModel, countryNameModel, countryCodeModel },
} = require("@/models/userModels/userModels");

let testUsers = {};

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should fill testUsers object", async () => {
    CustomRequest.setBaseUrl(cellphoneRouteBaseUrl);
    CustomRequest.setRouteObject(addBlockRoute);

    testUsers = await getTestUsersFromState();

    setTestUserAndTestToken(testUsers.testUser_0);
  });
});

describe("addBlock successful tests", () => {
  it(`should add testUser_1 to testUser_0 blacklist`, async () => {
    const { testUser_1 } = testUsers;

    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await CustomRequest.sendRequest(testUser_1);

    expect(phoneNumber).equal(testUser_1.phoneNumber);
    expect(phoneNumber.length)
      .greaterThanOrEqual(phoneNumberModel.minlength.value)
      .lessThanOrEqual(phoneNumberModel.maxlength.value);

    expect(countryCode).equal(testUser_1.countryCode);
    expect(countryCode.length)
      .greaterThanOrEqual(countryCodeModel.minlength.value)
      .lessThanOrEqual(countryCodeModel.maxlength.value);

    expect(countryName).equal(testUser_1.countryName);
    expect(countryName.length)
      .greaterThanOrEqual(countryNameModel.minlength.value)
      .lessThanOrEqual(countryNameModel.maxlength.value);
  });
});

describe("addBlock failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await CustomRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //* First one get succeed, but second one is duplicate
    await CustomRequest.sendRequest(testUser_2);
    await CustomRequest.sendRequest(testUser_2, BLACKLIST_ITEM_EXIST);
  });

  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});