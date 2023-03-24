const mongoose = require("mongoose");
let IdSchema = mongoose.Schema({
    _id : {
        type : String,
    },
    currId : {
        type : Number
    }
});

const Id = mongoose.model("Ids", IdSchema);

module.exports = Id;