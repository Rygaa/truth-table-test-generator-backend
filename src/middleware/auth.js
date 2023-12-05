const jwt = require("jsonwebtoken");
const { KEYS } = require("../utils/keys");
const { prisma } = require("../database/pg");

const auth = async (request, response, next) => {
  try {
    const jwtoken = request.body.jwtoken;
    if (!jwtoken || jwtoken == "undefined") {
      response.send({ status: "Error", message: `Please log in` });
      return;
    }
    const { id } = jwt.verify(jwtoken, KEYS.jwtoken);
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      response.send({ status: "Error", message: `Please log in` });
      return;
    }

    request.body.user = user;
    next();
  } catch (error) {
    response.send({
      status: "Error",
      message: `Problem with auth`,
      details: error,
    });
    return;
  }
};

module.exports = auth;
