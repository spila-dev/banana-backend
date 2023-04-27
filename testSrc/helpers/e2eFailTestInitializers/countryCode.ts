import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { ERRORS } from "@/variables";

const countryCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minLength()
    .maxLength(
      randomMaker.stringNumber(models.native.countryCode.maxLength + 1)
    )
    .custom(helpers.getWrongCountryCode(), ERRORS.COUNTRY_CODE_NOT_SUPPORTED);
};

export { countryCodeE2eFailTestInitializer };
