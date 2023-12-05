const bcrypt = require("bcrypt");

async function validateUsername(tx, response, username) {
  if (!username) {
    response.send({
      status: "Error",
      message: "Error",
    });
    return false;
  }
  if (!(await tx.user.findFirst({ where: { username } }))) {
    response.send({
      status: "Error",
      message: "Error"
    });
    return false;
  }
  return true;
}

async function validatePassword(response, userPassword, providedPassword) {
  if (!providedPassword) {
    response.send({
      status: "Error",
      message: "toast.NO_PASSWORD_PROVIDED",
    });
    return false;
  }
  if (!(await bcrypt.compare(providedPassword, userPassword))) {
    response.send({
      status: "Error",
      message: "toast.PASSWORD_IS_INCORRECT",
    });
    return false;
  }
  return true;
}

module.exports.validateUsername = validateUsername;
module.exports.validatePassword = validatePassword;
