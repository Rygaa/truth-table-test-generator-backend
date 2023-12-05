const express = require("express");
const router = express.Router();
const { prisma } = require("../../database/pg");
const auth = require("../../middleware/auth");

module.exports = router.post("/delete-type", auth, async (request, response) => {
  let { typeId, user } = request.body;
  console.log(user);
  await prisma.$transaction(async (tx) => {
    await tx.type.delete({ where: { id: typeId } });

    const fetchedTypes = await tx.type.findMany({ where: { userId: user.id } });

    response.status(200).send({ message: "toast.LOGIN_SUCCESSFULLY", fetchedTypes });
  });
});
