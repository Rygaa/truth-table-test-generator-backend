const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { KEYS } = require("../../utils/keys");
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");
const { v4: uuidv4 } = require("uuid");

module.exports = router.post("/create-project", auth, async (request, response) => {
  let { newProject, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    await tx.project.create({ data: { id: uuidv4(), name: newProject, userId: user.id } });

    const fetchedProjects = await tx.project.findMany({
      where: { userId: user.id },
      include: { conditions: true },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedProjects });
  });
});
