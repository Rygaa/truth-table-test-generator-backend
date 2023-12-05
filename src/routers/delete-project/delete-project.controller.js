const express = require("express");
const router = express.Router();
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");

module.exports = router.post("/delete-project", auth, async (request, response) => {
  let { projectId, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    await tx.project.delete({ where: { id: projectId } });

    const fetchedProjects = await tx.project.findMany({
      where: { userId: user.id },
      include: { conditions: true },
    });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedProjects });
  });
});
