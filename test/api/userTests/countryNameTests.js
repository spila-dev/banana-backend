const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");
const { userProps } = require("@/functions/helpers/UserProps");
const {
  userModels: { countryNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;

const countryNameFailureTests = (cellphone) => {
  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        undefined,
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        "Something wrong!",
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_NAME_INVALID_TYPE`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        1235468, //* Invalid type!
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        randomString(countryNameMinlength - 1),
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        randomString(countryNameMaxlength + 1),
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryNameFailureTests };