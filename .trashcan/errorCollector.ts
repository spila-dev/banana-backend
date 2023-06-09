import { trier } from "simple-trier";

import { errors } from "@/variables/errors";

const errorCollector = (res, error) => {
  trier(errorCollector.name)
    .try(tryToCollectError, error)
    .executeIfNoError(executeIfNoError, res)
    .catch(catchCollectError, res)
    .run();
};

const tryToCollectError = (error) => {
  if (error?.reason) return error;

  logger.dir(logger.levels.error, { unknownError: error }, { depth: 10 });

  return {
    ...errors.UNKNOWN_ERROR,
    unknownError: error,
  };
};

const executeIfNoError = (errorToSend, res) => {
  res.errors = fixResponseError(errorToSend);
};

const catchCollectError = (error, res) => {
  res.errors = { ...errors.UNKNOWN_ERROR, unknownError: error };
  res.errorResponser();
};

const fixResponseError = (error, extraData = {}, statusCode) => {
  const { key, ...rest } = error;

  return {
    [key]: { ...rest, ...extraData },
    statusCode: statusCode || error.statusCode,
  };
};

export { errorCollector };
