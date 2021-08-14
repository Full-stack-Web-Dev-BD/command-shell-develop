const scheduleModel =require('../model/scheduleModel')
const validator=require('../validator/customValidator')

const createSchedule=(req, res)=>{
    console.log(req.body)
    const verify=validator.scheduleValidator(req)
    if(!verify.isValid){
        return res.status(400).json(verify.err)
    }
    // time create
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = mm + '-' + dd + '-' + yyyy;
        var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();
        var time=h+":"+m+":"+s
        var fullTime=date+" at "+time
    
    new scheduleModel({
        time:req.body.time,
        title:req.body.title, 
        teacher:req.body.teacher, 
        createAt:fullTime,
        classroom:req.body.classroom,
        schoolsubject:req.body.schoolsubject
    })
    .save()
    .then(doc=>{
        res.status(200).json({massage:'Schedule created!',doc})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error occurd"})
    })

}
const editSchedule=(req, res)=>{
    console.log(req.params.id)
    scheduleModel.findByIdAndUpdate(req.params.id,req.body)
    .then(updated=>{
        res.status(200).json({massage:"Updated"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error"})
    })

}

const deleteSchedule =(req,res)=>{
    scheduleModel.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.status(200).json({massage:"Schedule deleted"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error "})
    })
}
 const getSingleSchedule=(req,res)=>{
    console.log(req.params.id)
     scheduleModel.findOne({_id:req.params.id})
     .then(doc=>{
         console.log(doc)
         res.status(200).json(doc)
     })
     .catch(err=>{
         console.log(err)
         res.status(500).json({massage:"Server error "})
     })
 }
const getAllSchedule=(req,res)=>{
    scheduleModel.find()
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({massage:"server error"})
    })
}
module.exports={
    createSchedule,
    editSchedule,
    deleteSchedule,
    getSingleSchedule,
    getAllSchedule
}