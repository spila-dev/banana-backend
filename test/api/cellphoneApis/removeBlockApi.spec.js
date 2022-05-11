const {
  setTestUserAndTestToken,
  request,
  expect,
} = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");
const { getTestUsersFromState } = require("@/functions/utilities/testUtils");

const {
  userModels: { phoneNumberModel, countryNameModel, countryCodeModel },
} = require("@/models/userModels/userModels");

const {
  cellphoneRoutes: { removeBlockRoute, addBlockRoute, cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");

const {
  userErrors: { BLACKLIST_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

let testUsers = {};

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should set routes objects and fill testUsers", async () => {
    customRequest.setBaseUrl(cellphoneRouteBaseUrl);
    customRequest.setRouteObject(removeBlockRoute);

    testUsers = await getTestUsersFromState();

    setTestUserAndTestToken(testUsers.testUser_0);
  });
});

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;
const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;
const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = testUsers;

    await request(cellphoneRouteBaseUrl, addBlockRoute, testUser_3);
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await customRequest.sendRequest(testUser_3);

    expect(phoneNumber).equal(testUser_3.phoneNumber);
    expect(phoneNumber.length)
      .greaterThanOrEqual(phoneNumberMinlength)
      .lessThanOrEqual(phoneNumberMaxlength);

    expect(countryCode).equal(testUser_3.countryCode);
    expect(countryCode.length)
      .greaterThanOrEqual(countryCodeMinlength)
      .lessThanOrEqual(countryCodeMaxlength);

    expect(countryName).equal(testUser_3.countryName);
    expect(countryName.length)
      .greaterThanOrEqual(countryNameMinlength)
      .lessThanOrEqual(countryNameMaxlength);
  });
});

describe("removeBlock failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await customRequest.sendRequest(
      userProps.makeCellphone(countryCode, countryName, "1234567890"),
      BLACKLIST_ITEM_NOT_EXIST
    );
  });

  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});
