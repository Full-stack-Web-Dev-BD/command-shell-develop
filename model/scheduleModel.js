const mongoose =require('mongoose')
const Schema=mongoose.Schema
const scheduleSchema=new Schema({
    time:String,
    title:String, 
    teacher:String, 
    createAt:String,
    classroom:String,
    schoolsubject:String
})

const scheduleModel=mongoose.model('scheduleModel',scheduleSchema)
module.exports=scheduleModel