const router = require("express").Router();
const messagesService = require("../services/message.service")

router.post("/messages", (req, res, next) => {

  const { destination, message } = req.body
  const body = message

  messagesService
    .sendMessage({ destination, body })
    .then((message) => res.status(200).json(message.data))
    .catch((error) => {

      if (!error.config.data.includes("destination") && !error.config.data.includes("body")) {
        return res.status(405).json({ message: "Destination and body key are empty, it must have destination and body keys" })
      }

      if (!error.config.data.includes("destination")) {
        return res.status(405).json({ message: "Destination key is empty, it must have destination and body keys" })
      }
      if (!error.config.data.includes("body")) {
        return res.status(405).json({ message: "Body key is empty, it must have destination and body keys" })
      }

    })
})

module.exports = router;