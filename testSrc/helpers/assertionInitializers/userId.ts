import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const userIdAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.userId, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .addCommonTest()
    .run();
};
