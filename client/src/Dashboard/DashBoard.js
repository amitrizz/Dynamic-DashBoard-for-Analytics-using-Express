import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios"
import Chart from "react-google-charts"
import './DashBoard.css'

function DashBoard() {
    const [fileContent, setFileContent] = useState(false);

    // data1 format
    const [val, setVal] = useState([])
    const [options, setOptions] = useState({})

    // data2 usestate data
    const [val2, setVal2] = useState([])
    const [options2, setOptions2] = useState({})

    // data2 usestate data
    const [val3, setVal3] = useState([])
    const [options3, setOptions3] = useState({})

    // data2 usestate data
    const [val4, setVal4] = useState([])
    const [options4, setOptions4] = useState({})

    // data2 usestate data
    const [val5, setVal5] = useState([])
    const [options5, setOptions5] = useState({})

    // data2 usestate data
    const [val6, setVal6] = useState([])
    const [options6, setOptions6] = useState({})


    function avgintlikerel(data) {
        setVal([
            ["Avg", "Data"],
            ["Intensity", data[0].avg_intensity],
            ["Likelihood", data[0].avg_likelihood],
            ["Relevance", data[0].avg_relevance],
        ])
        setOptions({
            chart: {
                title: "Compairson Between avg Intenity Likelihood and Relevance",
                subtitle: "Bar Graph of All these Three avg Value Hover To see Detials",
            },
        })
    }

    function avgintlikerelRegion(data) {
        // Sort the data based on intensity in descending order
        const sortedData = data.sort((a, b) => b.avg_intensity - a.avg_intensity);

        // Get the top 5 documents and extract their _id fields
        const topCountry = sortedData.slice(0, 7).map(item => item);
        let newData = [["Avg", "Intensity", "Likelihood", "Relevance"]];

        for (let i = 0; i < topCountry.length; i++) {
            const element = [topCountry[i]._id, topCountry[i].avg_intensity, topCountry[i].avg_likelihood, topCountry[i].avg_relevance];
            newData.push(element);
        }
        setVal2(newData)
        setOptions2({
            title: "Top 7 Region Wise Avg Intensity Likelihood and Relevance",
            chartArea: { width: "50%" },
            hAxis: {
                title: "Avg",
                minValue: 0,
            },
            vAxis: {
                title: "Region",
            },
        })
        // console.log(top5Ids);
    }






    function avgintlikerelSector(data) {
        // Sort the data based on intensity in descending order
        const sortedData = data.sort((a, b) => b.avg_intensity - a.avg_intensity);

        // Get the top 5 documents and extract their _id fields
        const topCountry = sortedData.slice(0, 5).map(item => item);
        let newData = [["Avg", "Intensity", "Likelihood", "Relevance"]];
        for (let i = 0; i < topCountry.length; i++) {
            const element = [topCountry[i]._id, topCountry[i].avg_intensity, topCountry[i].avg_likelihood, topCountry[i].avg_relevance];
            newData.push(element);

        }
        setVal3(newData)
        setOptions3({
            title: "Top 5 Sector Wise Intensity Likelihood and Relevance",
            chartArea: { width: "50%" },
            hAxis: {
                title: "Avg",
                minValue: 0,
            },
            vAxis: {
                title: "Sector",
            },
        })
        // console.log(top5Ids);
    }



    function avgintlikereltopic(data) {
        // Sort the data based on intensity in descending order
        const sortedData = data.sort((a, b) => b.avg_intensity - a.avg_intensity);

        // Get the top 5 documents and extract their _id fields
        const topTopic = sortedData.slice(0, 15).map(item => item);
        let newData = [["Topic", "Intensity"]];
        for (let i = 0; i < topTopic.length; i++) {
            const element = [topTopic[i]._id, topTopic[i].avg_intensity];
            newData.push(element);
        }
        setVal4(newData)
        setOptions4({
            // Material design options
            chart: {
              title: "How Intensity is Speared Based On Topic",
              subtitle: "Here We are taking top intensity topic To Show data Intensity",
            },
            hAxis: { title: "Hours Studied" },
            vAxis: { title: "Grade" },
          })
        // console.log(top5Ids);
    }


    function avgintlikerelcountry(data) {
        // Sort the data based on intensity in descending order
        const sortedData = data.sort((a, b) => b.avg_intensity - a.avg_intensity);

        // Get the top 5 documents and extract their _id fields
        const topTopic = sortedData.slice(0, 15).map(item => item);
        // console.log(topTopic[0].region);
        let newData = [
            ["Country", "Intensity", "Likelihood", "Region", "Relevance"],
            ["Unknown", 14.9, 4.5, "Asia", 4]

        ];
        for (let i = 0; i < topTopic.length; i++) {
            const element = [topTopic[i]._id, topTopic[i].avg_intensity, topTopic[i].avg_likelihood, topTopic[i].region, topTopic[i].avg_relevance];
            newData.push(element);
        }
        setVal5(newData)
        setOptions5({
            title:
                "Correlation between Intensity and Likelihood " +
                " of with some high intensity countries",
            hAxis: { title: "Intensity" },
            vAxis: { title: "Likelihood" },
            bubble: { textStyle: { fontSize: 11 } },
        })
        // console.log(top5Ids);
    }


    function yearwisePubliceData(data) {
        // console.log(topTopic[0].region);
        let newData = [["Year", "Count"]];
        for (let i = 0; i < data.length; i++) {
            const element = [(data[i]._id).toString(), data[i].count];
            newData.push(element);
        }
        setVal6(newData)
        setOptions6({
            chart: {
                title: "Number Of Data Publiced Each Year",
                subtitle: "some data year is not defined taken as Unknown",
            },
        })
        // console.log(top5Ids);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`https://simpleapi-1av1.onrender.com/api/dashboard/loaddata`);

                console.log(response);
                avgintlikerel(response.data.data)
                avgintlikerelRegion(response.data.data2)
                avgintlikerelSector(response.data.data3)
                avgintlikereltopic(response.data.data4)
                avgintlikerelcountry(response.data.data5)
                yearwisePubliceData(response.data.data6)
                setFileContent(true);


                //   setAllemployee(response)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='DashBoard'>
            <Navbar />
            <div className='Dashbody'>
                {fileContent ?
                    <div className='dashcontent'>
                        <div className='part1'>
                            <Chart
                                className='leftpart1'
                                chartType="Bar"
                                width="95%"
                                height="400px"
                                data={val}
                                options={options}
                            />

                            <Chart
                                chartType="Bar"
                                width="95%"
                                height="400px"
                                data={val6}
                                options={options6}
                            />
                        </div>

                        <div className='part1'>
                            <Chart
                                chartType="BubbleChart"
                                width="100%"
                                height="400px"
                                data={val5}
                                options={options5}
                            />
                        </div>

                        <div className='part1'>
                            <Chart
                                // className='leftpart2'
                                chartType="BarChart"
                                width="95%"
                                height="400px"
                                data={val2}
                                options={options2}
                            />

                            <Chart
                                chartType="BarChart"
                                width="95%"
                                height="400px"
                                data={val3}
                                options={options3}
                            />
                        </div>

                        <div className='part1'>

                            <Chart
                                chartType="Scatter"
                                width="100%"
                                height="400px"
                                data={val4}
                                options={options4}
                            />

                        </div>
                    </div>
                    : <div className='dashloading'>Loading...</div>}
            </div>
        </div>
    )
}

export default DashBoard
