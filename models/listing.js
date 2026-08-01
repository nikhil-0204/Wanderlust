const mongoose = require("mongoose");
const review = require("./review.js");
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema;

const listiingSchema = new Schema({
    title :{
       type: String,
        required : true,
    } ,
    description : String,
   image: {
        type: String,
        default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        set: (v) => v === "" ? undefined : v
    },
    price: Number,
    location: String,
    country : String,
    reviews:[
       {
         type:Schema.Types.ObjectId,
         ref:"Review",
       },
    ],
     owner: {
        type : Schema.Types.ObjectId,
        ref: "User",
    },
});

listiingSchema.post("findOneAndDelete", async(listing)=>
{
    if(listing)
    {
        await review.deleteMany({_id : {$in : listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",listiingSchema);
module.exports= Listing;