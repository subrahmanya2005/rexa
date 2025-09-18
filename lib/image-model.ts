 import { time } from "console";
import mongoose from "mongoose";


 const imageSchema = new mongoose.Schema({
    image_url:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    }},{
    timestamps:true
});
export const imageModel=mongoose.models.Image || mongoose.model("Image",imageSchema);