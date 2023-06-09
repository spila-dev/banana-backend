import { errors } from "~/variables";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      errors.selfStuff,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(data, errors.selfStuff);
    }
  );
};
