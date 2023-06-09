import { serviceHandler } from "@/classes/service/ServiceHandler";

class ServiceBuilder {
  #options = {
    inputFields: undefined,
    outputFields: undefined,
  };

  // constructor() {}

  #serviceBody = async () => logger.debug("service_body");

  body(callback) {
    this.#serviceBody = callback;
    return this;
  }

  // inputFields(fields) {
  //   this.#options.inputFields = fields;
  //   return this;
  // }

  // outputFields(fields) {
  //   this.#options.outputFields = fields;
  //   return this;
  // }

  build() {
    return serviceHandler.create(this.#serviceBody, this.#options);
  }
}

const serviceBuilder = { create: () => new ServiceBuilder() };

export { serviceBuilder, ServiceBuilder };
