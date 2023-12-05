const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");
const { v4: uuidv4 } = require("uuid");

module.exports = router.post("/create-type", auth, async (request, response) => {
  let { newType, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    await tx.type.create({ data: { id: uuidv4(), value: newType, userId: user.id } });

    const fetchedTypes = await tx.type.findMany({ where: { userId: user.id } });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedTypes });
  });
});
