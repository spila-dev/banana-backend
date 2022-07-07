const { userProps } = require("@/classes/UserProps");
const {
  addCellphoneToUserBlacklist,
} = require("@/models/userModels/userModelFunctions");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { body, currentUser } = req;

    const targetUser = userProps.makeCellphoneByParam(body);

    await addCellphoneToUserBlacklist(currentUser, targetUser);

    res.checkDataAndResponse({
      blockedCellphone: targetUser,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
