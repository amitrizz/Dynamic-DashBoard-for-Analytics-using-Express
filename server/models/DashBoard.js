import mongoose from "mongoose";

// "end_year": "Unknown",
//         "intensity": 6.0,
//         "sector": "Energy",
//         "topic": "gas",
//         "insight": "Annual Energy Outlook",
//         "url": "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
//         "region": "Northern America",
//         "start_year": "Unknown",
//         "impact": "",
//         "added": "January, 20 2017 03:51:25",
//         "published": "January, 09 2017 00:00:00",
//         "country": "United States of America",
//         "relevance": 2.0,
//         "pestle": "Industries",
//         "source": "EIA",
//         "title": "U.S. natural gas consumption is expected to increase during much of the projection period.",
//         "likelihood": 3.0
// Define the schema
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Create the model
const DataModel = mongoose.model("blackcoffer", dataSchema);

export default DataModel;
