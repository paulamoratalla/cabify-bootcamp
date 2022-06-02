const router = require("express").Router();
const messagesService = require("../services/message.service")

router.post("/messages", (req, res, next) => {

  const { destination, message } = req.body
  const body = message

  if (!destination && !body) {
    return res
      .status(400)
      .json({
        message:
          "The keys can't be empty. The necessary keys are destination and message",
      });
  }
  if (!destination) {
    return res.status(400).json({
      message:
        "The key destination must exist. The necessary keys are destination and message",
    });
  }
  if (!body) {
    return res
      .status(400)
      .json({
        message:
          "The key message must exist. The necessary keys are destination and message",
      });
  }

  messagesService
    .sendMessage({ destination, body })
    .then((message) => res.status(200).json(message.data))
    .catch(err => res.status(500).json(err))
})

module.exports = router;