const axios = require('axios')
const Message = require("../models/Message.model")

module.exports = class MongodbService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://localhost:9001',
        })
    }

    mongodb(messageStatus) {
        return Message
            .create(messageStatus)
            .then(res => res.data)
            .catch(err => err.data)
    }
}
