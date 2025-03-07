const jwt = require("jsonwebtoken");
require('dotenv').config()
const tokenGenerator = async (userid, email,name) => {
  try {
    return jwt.sign({ id: userid, email,name }, 
        process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { tokenGenerator };
