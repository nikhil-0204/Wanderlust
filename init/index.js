const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL;

const initDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        await Listing.deleteMany({});

        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "6acd0076e1e833f2f14a15bd"
        }));

        await Listing.insertMany(initData.data);

        console.log("Data was initialized successfully");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
};

initDB();