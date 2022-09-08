import mongoose from "mongoose";
const Schema = mongoose.Schema

const urlSchema = new Schema({
    shortLink : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    }
})

export default mongoose.model('Urls', urlSchema)
