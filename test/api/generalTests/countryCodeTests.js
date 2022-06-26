const { customRequest } = require("@/classes/CustomRequest");
const { testBuilder } = require("@/classes/TestBuilder");
const { randomMaker } = require("@/classes/RandomMaker");

const {
  userModels: { countryCodeModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;

const countryCodeSuccessTests = (
  { countryCodeMain, countryCodeTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .create()
    .setVariables(countryCodeModel, countryCodeMain, countryCodeTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .execute();
};

const countryCodeFailureTests = (data) => {
  const fn = (countryCode) => ({ ...data, countryCode });

  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await customRequest.sendRequest(fn(""), COUNTRY_CODE_REQUIRED);
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await customRequest.sendRequest(fn("98!"), COUNTRY_CODE_NUMERIC);
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(fn(98), COUNTRY_CODE_INVALID_TYPE);
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await customRequest.sendRequest(fn("010101"), COUNTRY_CODE_NOT_SUPPORTED);
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomStringNumber(countryCodeMinlength - 1)),
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomStringNumber(countryCodeMaxlength + 1)),
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryCodeFailureTests, countryCodeSuccessTests };
