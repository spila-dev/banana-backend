import { IoFields } from "check-fields";
import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { Route } from "@/types";

import { LOCAL_ERRORS } from "@/variables";

abstract class RouteBuilder {
  protected route: Route;

  constructor() {
    //@ts-ignore
    this.route = {};
  }

  inputFields(inputFields: IoFields) {
    this.route.inputFields = inputFields;
    return this;
  }
  outputFields(outputFields: IoFields) {
    this.route.outputFields = outputFields;
    return this;
  }

  build() {
    return this.route;
  }

  checkRequirements(...requirements: unknown[]) {
    errorThrower(customTypeof.isUndefined(...requirements), {
      ...LOCAL_ERRORS.ROUTE_IS_INVALID,
      route: this.route,
    });
  }
}

export { RouteBuilder };
