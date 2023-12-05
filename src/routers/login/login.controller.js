const jwt = require("jsonwebtoken");
const express = require("express");
const { validateUsername, validatePassword } = require("./login.validator");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const { prisma } = require("../../database/pg");

module.exports = router.post("/login", async (request, response) => {
  let { username, password } = request.body;
  username = username?.toLowerCase();

  await prisma.$transaction(async (tx) => {
    if (!(await validateUsername(tx, response, username))) return;
    const user = await prisma.user.findFirst({
      where: { username },
    });


    if (!(await validatePassword(response, user.password, password))) return;

    const jwtoken = jwt.sign({ id: user.id }, KEYS.jwtoken);
    await tx.user.update({
      where: { id: user.id },
      data: {
        jwtokens: { push: jwtoken },
      },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", jwtoken, userId: user._id, user: user });
  });
});
