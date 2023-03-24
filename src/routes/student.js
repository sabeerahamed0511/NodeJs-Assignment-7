const router = require("express").Router();
const Student = require("../models/Student");
const Id = require("../models/Id");



router.get("/api/student", async (req, res) => {
    try {
        let students = await Student.find();
        res.status(200).json(students);
    }
    catch(err) {
        res.status(404).json({message : err.message});
    }
});

router.get("/api/student/:id", async (req, res) => {
    try {
        // console.log(req.params.id)
        let student = await Student.findById(req.params.id);
        res.status(200).json(student); 
    }
    catch(err) {
        res.status(404).json({message : err.message});
    }
});

/*

* pre-load this in "ids" collection 
* {
    _id : "student_id",
    currId :8
  } 

*/

router.post("/api/student", async (req, res) => {
    const {currId} = await Id.findById("student_id");//8//9
    try {
        let student = await new Student({
            _id : currId,//8//9
            name : req.headers.name,
            currentClass : req.headers.currentclass, //currentClass  -> currentclass
            division : req.headers.division
        });
        student = await student.save();
        await Id.findByIdAndUpdate("student_id", {currId : `${currId+1}`});//9//10
        res.status(200).json(student);
    }
    catch(err) {
        res.status(400).json({message : err.message});
    }
});

router.put("/api/student/:id", async (req, res) => {
    let {name, currentclass, division} = req.headers;
    let newObj = {};
    if(name) newObj.name = name;
    if(currentclass) newObj.currentClass = currentclass;
    if(division) newObj.division = division; 

    try {
        let student = await Student.findByIdAndUpdate(req.params.id, newObj, {new : true} );
        student = await student.save();
        res.status(200).json(student);
    }
    catch(err) {
        res.status(400).json({message : err.message});
    }
});

router.delete("/api/student/:id", async (req, res) => {
    try {
        let student = await Student.findByIdAndDelete(req.params.id);
        if(student) res.status(200).json({message : "Deleted successfully"});
        else res.status(404).json({message : "Invalid ID"});
        
    }
    catch(err) {
        res.status(404).json({message : err.message});
    }
});

//to delete
router.delete("/api/student/", async (req, res) => {
    let ids = req.body.student_ids
    // console.log(ids)
    let data = {result : []}
    try {
            for(let i=0; i<ids.length; i++) {
                let isPresent = await Student.findById(ids[i]);
                if(isPresent) {
                    await Student.findByIdAndDelete(ids[i]);
                    data.result.push({[ids[i]] : "deleted successfully"});
                }
                else {
                    data.result.push({[ids[i]] : "Invalid id"});
                }
                
            }
        res.status(200).json(data);
        
        
    }
    catch(err) {
        res.status(404).json({message : err.message});
    }
});


module.exports = router;