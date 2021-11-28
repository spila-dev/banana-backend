const {
	userSchemaTemplate: { privateID },
} = require("./userSchemaTemplate");

const {
	chatError: {
		CHAT_ID_EXIST,
		CHAT_ID_INVALID_TYPE,
		CHAT_ID_MAX_LENGTH_REACH,
		CHAT_ID_MIN_LENGTH_REACH,
		CHAT_ID_REQUIRED,
		CREATED_AT_INVALID_TYPE,
		MESSAGE_ID_EXIST,
		MESSAGE_ID_INVALID_TYPE,
		MESSAGE_ID_MAX_LENGTH_REACH,
		MESSAGE_ID_MIN_LENGTH_REACH,
		MESSAGE_ID_REQUIRED,
		MESSAGE_TEXT_INVALID_TYPE,
		MESSAGE_TEXT_MAX_LENGTH_REACH,
		MESSAGE_TEXT_MIN_LENGTH_REACH,
		PARTICIPANT_ID_EXIST,
		PARTICIPANT_ID_INVALID_TYPE,
		PARTICIPANT_ID_MAX_LENGTH_REACH,
		PARTICIPANT_ID_MIN_LENGTH_REACH,
		PARTICIPANT_ID_REQUIRED,
	},
} = require("~/constant/error/chatError/chatError");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const chatSchemaTemplate = {
	chatID: {
		maxlength: fn(35, CHAT_ID_MAX_LENGTH_REACH),
		minlength: fn(30, CHAT_ID_MIN_LENGTH_REACH),
		required: fn(true, CHAT_ID_REQUIRED),
		trim: fn(true, "undefined"),
		type: fn("string", CHAT_ID_INVALID_TYPE),
		unique: fn(true, CHAT_ID_EXIST),
	},
	chatParticipants: {
		participantID: {
			maxlength: fn(privateID.maxlength.value, PARTICIPANT_ID_MAX_LENGTH_REACH),
			minlength: fn(privateID.minlength.value, PARTICIPANT_ID_MIN_LENGTH_REACH),
			required: fn(privateID.required.value, PARTICIPANT_ID_REQUIRED),
			trim: fn(privateID.trim.value, "undefined"),
			type: fn(privateID.type.value, PARTICIPANT_ID_INVALID_TYPE),
			unique: fn(privateID.unique.value, PARTICIPANT_ID_EXIST),
		},
		participantStatus: {},
		participantVisibility: {},
	},
	messages: {
		createdAt: {
			default: fn(Date.now, "undefined"),
			required: fn(true, "undefined"),
			type: fn("date", CREATED_AT_INVALID_TYPE),
		},
		messageID: {
			maxlength: fn(45, MESSAGE_ID_MAX_LENGTH_REACH),
			minlength: fn(40, MESSAGE_ID_MIN_LENGTH_REACH),
			required: fn(true, MESSAGE_ID_REQUIRED),
			trim: fn(true, "undefined"),
			type: fn("string", MESSAGE_ID_INVALID_TYPE),
			unique: fn(true, MESSAGE_ID_EXIST),
		},
		messageSender: {},
		messageStatus: {},
		messageText: {
			maxlength: fn(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
			minlength: fn(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
			type: fn("string", MESSAGE_TEXT_INVALID_TYPE),
		},
	},
};

module.exports = { chatSchemaTemplate };
