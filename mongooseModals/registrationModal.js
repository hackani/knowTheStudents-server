const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Define the schema
const registrationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true, // Corrected spelling of 'required'
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Define a method to create JWT token
registrationSchema.methods.createJWT_Token = async function () {
  // Removed incorrect syntax
  try {
    const jwtToken =jwt.sign(
      {
        userId: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "y", // Secret key for signing JWT token
      { expiresIn: "30d" }
    );
    console.log(jwtToken)
    return jwtToken
  } catch (err) {
    console.log("Error occurred in JWT web token");
    console.log(`Error: ${err}`);
  }
};

// Create model from schema
const RegistrationData = mongoose.model(
  "registered_students",
  registrationSchema
);

module.exports = RegistrationData;
