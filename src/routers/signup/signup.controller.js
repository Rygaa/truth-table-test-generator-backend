const express = require("express");
const { prisma } = require("../../database/pg");
const { validateUsername, validatePassword } = require("./signup.validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const signUpServices = require("./signup.services");

module.exports = router.post("/signup", async (request, response) => {
  let { username, password } = request.body;
  username = username?.toLowerCase();

  if (!(await validateUsername(username))) {
    return response.status(400).send({ message: "toast.PROBLEM_OCCURED_DURING_THE_CREATION_OF_THE_USER" });
  }

  if (!(await validatePassword(password))) {
    return response.status(400).send({ message: "toast.PROBLEM_OCCURED_DURING_THE_CREATION_OF_THE_USER" });
  }

  password = await bcrypt.hash(password, saltRounds);

  const accountCreatedSuccessfully = await prisma
    .$transaction(async (tx) => {
      const newUser = await signUpServices.createUser(tx, username, password);
      if (!newUser) return;

      const status = await signUpServices.setupFilesFolderForNewUser(newUser.id);
      if (!status) return;
    })
    .then(() => true)
    .catch(() => false);

  if (!accountCreatedSuccessfully) {
    return response.status(400).send({ message: "toast.PROBLEM_OCCURED_DURING_THE_CREATION_OF_THE_USER" });
  }

  response.status(200).send({ message: "toast.USER_CREATED_SUCCESSFULLY" });
});
