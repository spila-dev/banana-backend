const {
	userAuthError: {
		private_id_required,
		private_id_max_length_reach,
		private_id_min_length_reach,
		username_invalid_type,
		username_minlength_reach,
		username_maxlength_reach,
		first_name_required,
		first_name_minlength_reach,
		first_name_maxlength_reach,
		last_name_minlength_reach,
		last_name_maxlength_reach,
		cellphone_invalid_type,
		cellphone_required,
		cellphone_minlength_reach,
		cellphone_maxlength_reach,
		country_code_invalid_type,
		country_code_required,
		country_code_minlength_reach,
		country_code_maxlength_reach,
		country_name_invalid_type,
		country_name_required,
		country_name_minlength_reach,
		country_name_maxlength_reach,
		bio_minlength_reach,
		bio_maxlength_reach,
		mac_address_invalid_type,
		mac_address_required,
		mac_address_minlength_reach,
		mac_address_maxlength_reach,
		bio_invalid_type,
		created_at_invalid_type,
		first_name_invalid_type,
		private_id_invalid_type,
		last_name_invalid_type,
		cellphone_exist,
		mac_address_exist,
		private_id_exist,
		username_exist,
	},
} = require("~/constant/error/authError/userAuthError");

exports.userAuthTemplate = {
	privateID: {
		type: ["string", private_id_invalid_type],
		Type: [String, private_id_invalid_type],
		unique: [true, private_id_exist],
		required: [true, private_id_required],
		minlength: [30, private_id_min_length_reach],
		maxlength: [35, private_id_max_length_reach],
		trim: [true],
	},

	username: {
		type: ["string", username_invalid_type],
		Type: [String, username_invalid_type],
		unique: [true, username_exist],
		required: [false],
		minlength: [4, username_minlength_reach],
		maxlength: [12, username_maxlength_reach],
		trim: [true],
		lowercase: [true],
	},
	firstName: {
		type: ["string", first_name_invalid_type],
		Type: [String, first_name_invalid_type],
		required: [true, first_name_required],
		minlength: [1, first_name_minlength_reach],
		maxlength: [18, first_name_maxlength_reach],
		trim: [false],
	},
	lastName: {
		type: ["string", last_name_invalid_type],
		Type: [String, last_name_invalid_type],
		required: [false],
		minlength: [1, last_name_minlength_reach],
		maxlength: [18, last_name_maxlength_reach],
		trim: [false],
	},
	cellphone: {
		type: ["string", cellphone_invalid_type],
		Type: [String, cellphone_invalid_type],
		unique: [true, cellphone_exist],
		required: [true, cellphone_required],
		minlength: [10, cellphone_minlength_reach],
		maxlength: [12, cellphone_maxlength_reach],
	},
	countryCode: {
		type: ["string", country_code_invalid_type],
		Type: [String, country_code_invalid_type],
		required: [true, country_code_required],
		minlength: [2, country_code_minlength_reach],
		maxlength: [8, country_code_maxlength_reach],
		trim: [true],
	},
	countryName: {
		type: ["string", country_name_invalid_type],
		Type: [String, country_name_invalid_type],
		required: [true, country_name_required],
		minlength: [2, country_name_minlength_reach],
		maxlength: [32, country_name_maxlength_reach],
	},
	bio: {
		type: ["string", bio_invalid_type],
		required: [false],
		Type: [String, bio_invalid_type],
		minlength: [1, bio_minlength_reach],
		maxlength: [255, bio_maxlength_reach],
	},
	macAddress: {
		type: ["string", mac_address_invalid_type],
		Type: [String, mac_address_invalid_type],
		unique: [true, mac_address_exist],
		required: [true, mac_address_required],
		minlength: [12, mac_address_minlength_reach],
		maxlength: [16, mac_address_maxlength_reach],
		trim: [true],
	},
	createdAt: {
		type: ["date", created_at_invalid_type],
		Type: [Date, created_at_invalid_type],
		// required: [true],
		default: [Date.now],
	},
};