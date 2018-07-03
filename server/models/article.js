const mongoose = require("mongoose")
const Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

const articleSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'user'},
    title:{type:String,required:true},
    content:{type:String,required:true},
    pic_url:{type:String,required:true},
})

articleSchema.plugin(mongoosePaginate);
articleSchema.plugin(timestamps)

mongoose.model('article',articleSchema)

const article = mongoose.model('article',articleSchema)

module.exports=article