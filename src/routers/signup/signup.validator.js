const { prisma } = require("../../database/pg");

async function validateUsername(username) {
  return username || username.length < 6;
}

async function validateEmail(email) {
  if (!email) return false;
  console.log(email)

  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(email)) {
    return false;
  }

  const foundUser = await prisma.user.findFirst({ where: { email } });
  if (foundUser) {
    return false;
  }


  return true;
}

async function validatePassword(password) {
  if (!password || password.length < 1) {
    return false;
  }
  return true;
}

module.exports.validateUsername = validateUsername;
module.exports.validateEmail = validateEmail;
module.exports.validatePassword = validatePassword;
