const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

async function setupFilesFolderForNewUser(newUserId) {
  return await fs.promises.mkdir(`${__dirname}/../../storage/files/${newUserId}`);
}

async function createUser(tx, username, password) {
  return await tx.user.create({
    data: {
      id: uuidv4(),
      username,
      password,
      jwtokens: {},
    },
  });
}

const signUpServices = {
  createUser,
  setupFilesFolderForNewUser,
};

module.exports = signUpServices;
