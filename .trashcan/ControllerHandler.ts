import { trier } from "simple-trier";

class ControllerHandler {
  constructor({
    req,
    res,
    controllerName,
    tryCallback,
    responseCallback,
    catchCallback,
  }) {
    this.req = req;
    this.res = res;
    this.tryCallback = tryCallback;
    this.responseCallback = responseCallback;
    this.catchCallback = catchCallback;
    this.controllerName = controllerName;
  }

  async run() {
    //FIXME: Add trier wrapper and throw unknown error
    await trier(this.controllerName)
      .tryAsync(this.tryCallback, this.req, this.res)
      .executeIfNoError(this.responseCallback, this.res)
      .catch(this.catchCallback, this.res)
      .runAsync();
  }
}

const controllerHandler = {
  create:
    // prettier-ignore
    ({ controllerName, tryCallback, responseCallback, catchCallback }) =>
      (req , res ) =>
        new ControllerHandler({
          req,
          res,
          controllerName,
          tryCallback,
          responseCallback,
          catchCallback,
        }).run(),
};

export { controllerHandler, ControllerHandler };
