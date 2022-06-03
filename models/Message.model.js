const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, "Destination is required"],
            trim: true
        },
        body: {
            type: String,
            required: [true, "Message is required"],
            lowercase: true,
        },
        number: {
            type: Number,
            // unique: true,
            // required: [true, "Number is required"],
            // trim: true
        },
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema)

module.exports = Message