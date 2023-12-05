const jwt = require("jsonwebtoken");
const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const moment = require("moment");

const { prisma } = require("../../database/pg");
module.exports = router.post("/auto-login", auth, async (request, response) => {
  // var waitTill = new Date(new Date().getTime() + 10 * 1000);
  // while (waitTill > new Date()) {}

  await prisma.$transaction(async (tx) => {
    const jwtoken = jwt.sign({ id: request.body.user.id }, KEYS.jwtoken);

    const user = await tx.user.update({
      where: { id: request.body.user.id },
      data: {
        jwtokens: { push: jwtoken },
      },
      include: {
        types: true,
        projects: {
          include: { conditions: true },
        },
      },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", jwtoken, userId: user._id, user: user });
  });
});
