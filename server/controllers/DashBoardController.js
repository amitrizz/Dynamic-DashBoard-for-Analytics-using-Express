import DataModel from '../models/DashBoard.js';


class DashBoardController {
    static avgIntLikeRel = async (req, res, next) => {
        try {

            //to check if user is already registered by this email
            const data = await DataModel.aggregate([
                {
                    $group: {
                        _id: null,
                        avg_likelihood: { $avg: "$likelihood" },
                        avg_relevance: { $avg: "$relevance" },
                        avg_intensity: { $avg: "$intensity" }
                    }
                }
            ]);
            const data2 = await DataModel.aggregate([
                {
                    $group: {
                        _id: "$region",
                        avg_likelihood: { $avg: "$likelihood" },
                        avg_relevance: { $avg: "$relevance" },
                        avg_intensity: { $avg: "$intensity" }
                    }
                }
            ]);
            const data3 = await DataModel.aggregate([
                {
                    $group: {
                        _id: "$sector",
                        avg_likelihood: { $avg: "$likelihood" },
                        avg_relevance: { $avg: "$relevance" },
                        avg_intensity: { $avg: "$intensity" }
                    }
                }
            ]);
            // const data = await DataModel.find({ "intensity": { $gt: 0 } });
            // console.log(data3); 
            const data4 = await DataModel.aggregate([
                {
                    $group: {
                        _id: "$topic",
                        avg_likelihood: { $avg: "$likelihood" },
                        avg_relevance: { $avg: "$relevance" },
                        avg_intensity: { $avg: "$intensity" }
                    }
                }
            ]);
            const data5 = await DataModel.aggregate([
                {
                    $group: {
                        _id: "$country",
                        avg_likelihood: { $avg: "$likelihood" },
                        avg_relevance: { $avg: "$relevance" },
                        avg_intensity: { $avg: "$intensity" },
                        region: { $first: "$region" }
                    }
                }
            ]);

            const data6 = await DataModel.aggregate([
                {
                    $addFields: {
                        year: {
                            $cond: {
                                if: { $regexMatch: { input: "$published", regex: /^[a-zA-Z]+,\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}$/ } },
                                then: { $year: { $dateFromString: { dateString: "$published", format: "%B, %d %Y %H:%M:%S" } } },
                                else: "Unknown"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$year",
                        data: { $push: "$$ROOT" }, // Accumulate documents for each year
                        average_likelihood: { $avg: "$likelihood" },
                        average_relevance: { $avg: "$relevance" },
                        average_intensity: { $avg: "$intensity" },
                        count: { $sum: 1 } // Count the number of documents for each year
                    }
                },
                {
                    $sort: { _id: 1 } // Sort by year in ascending order
                }
            ]);
            // const data = await DataModel.find({ "intensity": { $gt: 0 } });
            console.log("sending");
            res.send({ data: "data", data: data, data2: data2, data3: data3, data4: data4, data5: data5, data6: data6 })
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static filterdata = async (req, res, next) => {
        try {

            //to check if user is already registered by this email
            const { filtertype, searchkey } = req.body;
            const fieldName = filtertype; // Field on which you want to search
            const searchKey = searchkey; // Search key value

            // Construct the regular expression pattern
            const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Construct the regular expression pattern with wildcard characters
            const regexPattern = new RegExp('.*' + escapedSearchKey + '.*', 'i'); // 'i' flag for case-insensitive search

            // Construct the query
            const query = {
                [fieldName]: { $regex: regexPattern }
            };
            const results = await DataModel.find(query);
            // console.log(results);
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }


    static showData = async (req, res) => {
        try {
            const noOfPage = 30;
            const { skip } = req.body;
            const nextresult = (skip - 1) * noOfPage
            // console.log(skip);
            const results = await DataModel.find().skip(nextresult).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }

}
export default DashBoardController;