const mongoose = require("mongoose");
let studentSchema = mongoose.Schema({
    _id : {
        type : Number
    },
    name : {
        type : String,
        required : true
    },
    currentClass : {
        type : Number,
        required : true
    },
    division : {
        type : String,
        required : true
    }
});

const Student = mongoose.model("students", studentSchema);

module.exports = Student;