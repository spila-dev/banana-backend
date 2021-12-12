const { userSchemaTemplate } = require("~/template/schemaTemplate/userSchemaTemplate");

const templateUserController = (req, res) => {
	try {
		res.status(200).json(userSchemaTemplate);
	} catch (error) {
		res.errorCollector({ data: { error: "Unexpected server error" } });
		res.errorResponser();
	}
};

module.exports = { templateUserController };
