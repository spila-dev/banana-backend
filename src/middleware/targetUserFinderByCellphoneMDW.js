const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const targetUserFinderByCellphoneMDW = async (req, res, next) => {
	try {
		const { cellphone } = req.body;

		const { user: targeUser } = await userFinder({ ...cellphone });

		if (targeUser === null) {
			const error = {
				cellphone,
				...userError.CELLPHONE_NOT_EXIST,
			};
			throw error;
		}
	} catch (error) {
		console.log("targetUserFinderByCellphone catch", error);

		res.errorCollector({ data: { error } });
	} finally {
		next();
	}
};

module.exports = { targetUserFinderByCellphoneMDW };
