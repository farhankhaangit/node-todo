const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    text : {
        type : String,
        require : true
    },
    time : {
        type : Date,
        require : true
    },
    title : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Todo',todoSchema)