const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");
const { v4: uuidv4 } = require("uuid");

module.exports = router.post("/delete-condition", auth, async (request, response) => {
  let { conditionId, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    await tx.condition.delete({ where: { id: conditionId } });

    const fetchedProjects = await tx.project.findMany({
      where: { userId: user.id },
      include: { conditions: true },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedProjects });
  });
});
