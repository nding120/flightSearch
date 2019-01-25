const mongoose = require("mongoose");

const postSchema=mangoose.schema({
    flightNumber:{type:Number, required:true},
    carrier:{type:String,required:true},
    origin:{type:String, reqiured:true},
    departure:{type:Date, reqiured:true},
    destination:{type:String,reqiured:true},
    arrival:{type:Date,reqiured:true},
    aircraft:{type:String,reqiured:true},
    distance:{type:Number,reqiured:true},
    travelTime:{type:String,reqiured:true},
    status:{type:String,reqiured:true}
})
module.exports=mongoose.model("postFlight",postSchema);