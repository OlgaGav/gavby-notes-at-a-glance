const dayjs = require("dayjs");

const logger = (req, res, next) => {
  console.log(
    `${dayjs().format()}: ${req.method} request to ${req.protocol}://${req.get(
      "host"
    )}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
