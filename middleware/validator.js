const Joi = require("@hapi/joi");

const getYear = () => {
  const dt = new Date();
  return dt.getFullYear();
};

const registerValidation = (data) => {
  const schema = Joi.object({
    "First Name": Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"First Name" should be letters only`
      }),
    "Middle Name": Joi.string()
      .required()
      .trim()
      .min(2)
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .messages({
        "string.pattern.base": `"Middle Name" should be letters only`
      }),
    "Last Name": Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .messages({
        "string.pattern.base": `"Last Name" should be letters only`
      }),
    Sex: Joi.string().required(),
    "Birth Month": Joi.string().required(),
    "Birth Day": Joi.number().required().integer().min(1).max(31),
    "Birth Year": Joi.number().required().integer().min(1900).max(getYear()),
    "Email Address": Joi.string().trim().required().email(),
    Password: Joi.string()
      .trim()
      .required()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!-/:-@[-`{-~]).*$"
        )
      )
      .messages({
        "string.pattern.base": `"Password" must contain one of the following: uppercase and lowercase letters, number, and symbol`
      }),
    "Confirm Password": Joi.valid(Joi.ref("Password")).messages({
      "any.only": `"Password" does not match`
    })
  });
  return schema.validate({
    "First Name": data.firstName,
    "Middle Name": data.middleName,
    "Last Name": data.lastName,
    "Birth Month": data.birthMonth,
    "Birth Day": data.birthDay,
    "Birth Year": data.birthYear,
    Sex: data.sex,
    "Email Address": data.email,
    Password: data.password,
    "Confirm Password": data.confirmPassword
  });
};

const setupValidation = (data) => {
  const schema = Joi.object({
    Address: Joi.string().required().trim(),
    Nationality: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Nationality" should be letters only`
      }),
    "Civil Status": Joi.string().required(),
    Religion: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Religion" should be letters only`
      }),
    "Contact Number": Joi.string()
      .pattern(new RegExp("^[+]*[-s./0-9]*$"))
      .messages({
        "string.pattern.base": `"Contact Number" must be valid`
      }),
    "Guardian Name": Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Guardian Name" should be letters only and must be full name`
      }),
    Relationship: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Relationship" should be letters only`
      }),
    "Guardian Contact Number": Joi.string()
      .pattern(new RegExp("^[+]*[-s./0-9]*$"))
      .messages({
        "string.pattern.base": `"Guardian Contact Number" must be valid`
      })
  });

  return schema.validate({
    Address: data.address,
    Nationality: data.nationality,
    "Civil Status": data.civilStatus,
    Religion: data.religion,
    "Contact Number": data.contactNumber,
    "Guardian Name": data.guardianName,
    Relationship: data.relationship,
    "Guardian Contact Number": data.guardianContactNo
  });
};

const editInfoValidation = (data) => {
  const schema = Joi.object({
    Address: Joi.string().required().trim(),
    Nationality: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Nationality" should be letters only`
      }),
    "Civil Status": Joi.string().required(),
    Religion: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Religion" should be letters only`
      }),
    "Contact Number": Joi.string()
      .pattern(new RegExp("^[+]*[-s./0-9]*$"))
      .messages({
        "string.pattern.base": `"Contact Number" must be valid`
      }),
    "Guardian Name": Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Guardian Name" should be letters only and must be full name`
      }),
    Relationship: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"Relationship" should be letters only`
      }),
    "Guardian Contact Number": Joi.string()
      .pattern(new RegExp("^[+]*[-s./0-9]*$"))
      .messages({
        "string.pattern.base": `"Guardian Contact Number" must be valid`
      })
  });

  return schema.validate({
    Address: data.address,
    Nationality: data.nationality,
    "Civil Status": data.civilStatus,
    Religion: data.religion,
    "Contact Number": data.contactNumber,
    "Guardian Name": data.guardianName,
    Relationship: data.relationship,
    "Guardian Contact Number": data.guardianContactNo
  });
};

const editInfoCValidation = (data) => {
  const schema = Joi.object({
    "First Name": Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .trim()
      .messages({
        "string.pattern.base": `"First Name" should be letters only`
      }),
    "Middle Name": Joi.string()
      .required()
      .trim()
      .min(2)
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .messages({
        "string.pattern.base": `"Middle Name" should be letters only`
      }),
    "Last Name": Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z _]*$"))
      .messages({
        "string.pattern.base": `"Last Name" should be letters only`
      }),
    Sex: Joi.string().required(),
    "Birth Month": Joi.string().required(),
    "Birth Day": Joi.number().required().integer().min(1).max(31),
    "Birth Year": Joi.number().required().integer().min(1900).max(getYear()),
    "Contact Number": Joi.string()
      .pattern(new RegExp("^[+]*[-s./0-9]*$"))
      .messages({
        "string.pattern.base": `"Contact Number" must be valid`
      })
  });

  return schema.validate({
    "First Name": data.firstName,
    "Middle Name": data.middleName,
    "Last Name": data.lastName,
    "Birth Month": data.birthMonth,
    "Birth Day": data.birthDay,
    "Birth Year": data.birthYear,
    Sex: data.sex,
    "Contact Number": data.contactNumber
  });
};

const emailValidation = (data) => {
  const schema = Joi.object({
    "Email address": Joi.string().trim().email().required()
  });
  return schema.validate({
    "Email address": data.email
  });
};

const passwordValidation = (data) => {
  const schema = Joi.object({
    "Current Password": Joi.string().trim().required(),
    "New Password": Joi.string()
      .trim()
      .required()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!-/:-@[-`{-~]).*$"
        )
      )
      .messages({
        "string.pattern.base": `"New Password" must contain one of the following: uppercase and lowercase letters, number, and symbol`
      }),
    "Confirm Password": Joi.valid(Joi.ref("New Password")).messages({
      "any.only": `"Password" does not match`
    })
  });
  return schema.validate({
    "Current Password": data.currentPassword,
    "New Password": data.newPassword,
    "Confirm Password": data.confirmPassword
  });
};

const resetValidation = (data) => {
  const schema = Joi.object({
    "New Password": Joi.string()
      .trim()
      .required()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!-/:-@[-`{-~]).*$"
        )
      )
      .messages({
        "string.pattern.base": `"New Password" must contain one of the following: uppercase and lowercase letters, number, and symbol`
      }),
    "Confirm Password": Joi.valid(Joi.ref("New Password")).messages({
      "any.only": `"Password" does not match`
    })
  });
  return schema.validate({
    "New Password": data.newPassword,
    "Confirm Password": data.confirmPassword
  });
};

const hwValidation = (data) => {
  const schema = Joi.object({
    Height: Joi.string()
      .allow("")
      .pattern(new RegExp("^[0-9]+([.][0-9]+)?$"))
      .messages({
        "string.pattern.base": `"Height" must be a number`
      }),
    Weight: Joi.string()
      .allow("")
      .pattern(new RegExp("^[0-9]+([.][0-9]+)?$"))
      .messages({
        "string.pattern.base": `"Weight" must be a number`
      }),
    "Blood Type": Joi.string()
      .allow("")
      .pattern(new RegExp("^[a-z,A-Z][+|-]$"))
      .messages({
        "string.pattern.base": `"Blood Type" must be valid`
      })
  });
  return schema.validate({
    Height: data.height,
    Weight: data.weight,
    "Blood Type": data.bloodType
  });
};

module.exports.registerValidation = registerValidation;
module.exports.setupValidation = setupValidation;
module.exports.editInfoValidation = editInfoValidation;
module.exports.editInfoCValidation = editInfoCValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.resetValidation = resetValidation;
module.exports.hwValidation = hwValidation;
