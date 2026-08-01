const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
//connection establish 
main()
.then(()=>{
    console.log("connected to the DB");
})
.catch((err)=>
{
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}
//claenaing the alredy availble data
const initDb = async() =>{
    await Listing.deleteMany({}); //deleting the data
initData.data = initData.data.map((obj) => ({...obj,owner: "69bfc545029493f7ae497b77"}));    
   await Listing.insertMany(initData.data); //inserting the new data
    console.log("data was initialised");
}
initDb();