const router = require("express").Router();
const res = require("express/lib/response");
const messagesService = require("../services/message.service");
const MongodbService = require("../services/mongodb.service");
const Message = require("./../models/Message.model")

router.post("/messages", (req, res, next) => {

  const { destination, body, number } = req.body

  if (!destination && !body && !number) {
    return res
      .status(400)
      .json({
        message:
          "The keys can't be empty. The necessary keys are destination, body and number",
      });
  }
  else if (!destination) {
    return res.status(400).json({
      message:
        "The key destination must exist. The necessary keys are destination, body and number",
    });
  }
  else if (!body) {
    return res
      .status(400)
      .json({
        message:
          "The key body must exist. The necessary keys are destination, body and number",
      });
  }
  else if (!number) {
    return res
      .status(400)
      .json({
        message:
          "The key number must exist. The necessary keys are destination, body and number",
      });
  }
  else {
    messagesService
      .sendMessage({ destination, body })
      .then(() => {
        return Message
          .create({ destination, body, number })

          .then(response => res.status(200).json({ message: "Message send correctly" }))

          .catch(err => res.status(504).json({ message: "Message was send but not confirmed" }))
      })
      .catch(err => res.status(500).json({ message: "Server error. Message was not send" }))
  }
})

router.get('/messages', (req, res, next) => {

  Message
    .find()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err))
})

module.exports = router;