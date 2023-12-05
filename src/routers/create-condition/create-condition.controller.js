const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");
const { v4: uuidv4 } = require("uuid");

module.exports = router.post("/create-condition", auth, async (request, response) => {
  let { projectId, conditionKey, conditionValue, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    const project = await tx.project.findUnique({ where: { id: projectId } });

    await tx.condition.create({
      data: { id: uuidv4(), key: conditionKey, value: conditionValue, projectId: project.id },
    });

    const fetchedProjects = await tx.project.findMany({
      where: { userId: user.id },
      include: { conditions: true },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedProjects });
  });
});
