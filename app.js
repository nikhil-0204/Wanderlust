const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
 const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter= require("./routes/review.js");
const userRouter = require("./routes/user.js");


   

 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const sessionOptions = {
    secret: "mysupersecreatecode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,
    },
};

app.get("/",(req,res)=>
{
  res.send("hi i am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
     next();
});

// app.get("/demouser", async(req,res)=>
// {
//    let fakeUser = new User({
//     email:"stundent@gmail.com",
//     username : "delta-student"
//    });
//    let registersUser = await User.register(fakeUser , "helloworld");
//    res.send(registersUser);
// });

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);
// app.get("/testListing",async (req,res)=> {
//     let sampleListing = new Listing({
//         title :"My new Villa",
//         description:"By the beach",
//         price:"1200",
//         location : "calanguta , Goa",
//         country : "India"
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("sucessfull testing ");
// });

//post route
//for all the error ahndleing if the error not chaching 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req , res, next)=>{
    const{statusCode = 500, message="Something Went Wrong"} = err;

    // res.status(statusCode).send(message);
    res.status(statusCode).render("error",{message,err});
});
app.listen(8080, () => 
{
    console.log("server is listening to the port 8080");
});