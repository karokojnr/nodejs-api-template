const mongoose = require("mongoose");
const TODOSchema = new mongoose.Schema({
    title : {
        type: String,
        require : true
    },
    description :{
        type: String,
        require: true
    },
    createdBy : {
        type: String,
        require: true
    },
    createAt : {
        type: Date,
        default:  Date.now()
    }
});

const TODO = mongoose.model("todo", TODOSchema);
module.exports = TODO;