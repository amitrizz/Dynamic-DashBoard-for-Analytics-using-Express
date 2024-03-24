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
                title: "Company Performance",
                subtitle: "Sales, Expenses, and Profit: 2014-2017",
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
            chart: {
                title: "Region Wise Intensity Likelihood and Relevance",
                subtitle: "Compairson between These Three Value with Top 10 Country Data",
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
            title: "Section Wise Intensity Likelihood and Relevance",
            chartArea: { width: "50%" },
            hAxis: {
                title: "Total Population",
                minValue: 0,
            },
            vAxis: {
                title: "City",
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
            title: "Topic Wise Intensity",
            chartArea: { width: "50%" },
            hAxis: {
                title: "Total Population",
                minValue: 0,
            },
            vAxis: {
                title: "City",
            },
        })
        // console.log(top5Ids);
    }


    function avgintlikerelcountry(data) {
        // Sort the data based on intensity in descending order
        const sortedData = data.sort((a, b) => b.avg_intensity - a.avg_intensity);

        // Get the top 5 documents and extract their _id fields
        const topTopic = sortedData.slice(0, 15).map(item => item);
        // console.log(topTopic[0].region);
        let newData = [["Country", "Intensity", "Likelihood", "Region", "Relevance"]];
        for (let i = 0; i < topTopic.length; i++) {
            const element = [topTopic[i]._id, topTopic[i].avg_intensity, topTopic[i].avg_likelihood, topTopic[i].region, topTopic[i].avg_relevance];
            newData.push(element);
        }
        setVal5(newData)
        setOptions5({
            title:
                "Correlation between life expectancy, fertility rate " +
                "and population of some world countries (2010)",
            hAxis: { title: "Life Expectancy" },
            vAxis: { title: "Fertility Rate" },
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
                title: "Region Wise Intensity Likelihood and Relevance",
                subtitle: "Compairson between These Three Value with Top 10 Country Data",
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
                                width="100%"
                                height="300px"
                                data={val}
                                options={options}
                            />

                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="300px"
                                data={val6}
                                options={options6}
                            />
                        </div>

                        <div className='part4'>
                            <Chart
                                chartType="BubbleChart"
                                width="100%"
                                height="400px"
                                data={val5}
                                options={options5}
                            />
                        </div>

                        <div className='part2'>
                            <Chart
                                // className='leftpart2'
                                chartType="Bar"
                                width="100%"
                                height="300px"
                                data={val2}
                                options={options2}
                            />

                            <Chart
                                chartType="BarChart"
                                width="100%"
                                height="300px"
                                data={val3}
                                options={options3}
                            />
                        </div>

                        <div className='part3'>

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
