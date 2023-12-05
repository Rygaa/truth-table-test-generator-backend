async function Success(response, message, data) {
  response.send({
    status: "Success",
    message,
    data,
  });
}

async function Warning(response, message, data) {
  response.send({
    status: "Warning",
    message,
    data,
  });
}

async function Error(response, message, data) {
  response.send({
    status: "Error",
    message,
    data,
  });
}

const _resDepracted = {
  send: {
    Success,
    Warning,
    Error,
  },
};

module.exports = _resDepracted;
