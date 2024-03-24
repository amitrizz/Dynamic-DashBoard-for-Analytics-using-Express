import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from './config/connectdb.js';
import router from './routes/DashBoardRoutes.js';
import fs from "fs"
import DataModel from './models/DashBoard.js';


const app = express();
// cors policy
app.use(cors());
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;


// JSON 
app.use(express.json());//sort data into json format

// Connect Database
connectDB(DATABASE_URL);


// Routes
app.use("/api/dashboard",router)//for security purposes change the path to /api/users

app.get("/",async (req,res)=>{
    
    // const jsonData = JSON.parse(fs.readFileSync('updated_data.json', 'utf8'));
    // // console.log();
    // for (let i = 0; i < 1000; i++) {
    //     const newData = new DataModel({
    //         end_year:jsonData[i].end_year,
    //         intensity:jsonData[i].intensity,
    //         sector:jsonData[i].sector,
    //         topic:jsonData[i].topic,
    //         insight:jsonData[i].insight,
    //         url: jsonData[i].url,
    //         region:jsonData[i].region,
    //         start_year:jsonData[i].start_year,
    //         impact:jsonData[i].impact,
    //         added:jsonData[i].added,
    //         published:jsonData[i].published,
    //         country:jsonData[i].country,
    //         relevance:jsonData[i].relevance,
    //         pestle:jsonData[i].pestle,
    //         source:jsonData[i].source,
    //         title:jsonData[i].title,
    //         likelihood:jsonData[i].likelihood
    //     });
    //     await newData.save();
    // }
    // const result= await DataModel.insertMany(jsonData);
    // console.log(result);
    res.send("Running");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});