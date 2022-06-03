// const router = require("express").Router();
// const messagesService = require("../services/message.service")

// router.post("/messages", (req, res, next) => {

//   const { destination, message } = req.body
//   const body = message

//   if (!destination && !body) {
//     return res
//       .status(400)
//       .json({
//         message:
//           "The keys can't be empty. The necessary keys are destination and message",
//       });
//   }
//   if (!destination) {
//     return res.status(400).json({
//       message:
//         "The key destination must exist. The necessary keys are destination and message",
//     });
//   }
//   if (!body) {
//     return res
//       .status(400)
//       .json({
//         message:
//           "The key message must exist. The necessary keys are destination and message",
//       });
//   }

//   messagesService
//     .sendMessage({ destination, body })
//     .then((message) => res.status(200).json(message.data))
//     .catch(err => res.status(500).json(err))
// })

// module.exports = router;

const router = require("express").Router();
const messagesService = require("../services/message.service")
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
  if (!destination) {
    return res.status(400).json({
      message:
        "The key destination must exist. The necessary keys are destination, body and number",
    });
  }
  if (!body) {
    return res
      .status(400)
      .json({
        message:
          "The key body must exist. The necessary keys are destination, body and number",
      });
  }
  if (!number) {
    return res
      .status(400)
      .json({
        message:
          "The key number must exist. The necessary keys are destination, body and number",
      });
  }

  messagesService
    .sendMessage({ destination, body })
    .then(() => {
      return Message.create({ destination, body, number })
    })
    .then((newMessage) => res.json(newMessage))
    .catch(err => res.status(500).json(err))

})


router.get('/messages', (req, res, next) => {

  Message
    .find()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err))
})


module.exports = router;