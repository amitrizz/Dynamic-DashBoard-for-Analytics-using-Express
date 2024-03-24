import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios"
import './FilterBoard.css'


function FilterBoard() {
    const [filterType, setfilterType] = useState("");
    const [searchKey, setsearchKey] = useState("");
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const showdata = async () => {
            // console.log('Selected department:', department);
            try {

                const res = await axios.get(`http://localhost:7000/api/dashboard/showdata`);

                // console.log(res.data.data);
                setLoad(true)
                setData(res.data.data)
                // setAllemployee(res.data.sortedGroupDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        showdata();

    }, [])

    const handleFieldCheckButtonClick = async () => {
        // Here, you can perform any action you want to do when the button is clicked
        // console.log('Selected department:', department);
        setLoad(false);
        try {

            const res = await axios.post(`http://localhost:7000/api/dashboard/filter`, { filtertype: filterType, searchkey: searchKey });

            console.log(res.data.data);
            setData(res.data.data)
            setLoad(true);
            // setAllemployee(res.data.sortedGroupDept);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSelectChangeField = (event) => {
        setfilterType(event.target.value);
    };

    return (
        <div className='filterBoard'>
            <Navbar />
            <div className='filterbody'>

                {
                    load ? (<div>
                        <div class="input-group mb-3">
                            <select value={filterType} onChange={handleSelectChangeField}>
                                <option value="end_year">End Year</option>
                                <option value="intensity">intensity</option>
                                <option value="sector">sector</option>
                                <option value="topic">topic</option>
                                <option value="insight">insight</option>
                                <option value="region">region</option>
                                <option value="start_year">start_year</option>
                                <option value="impact">impact</option>
                                <option value="country">country</option>
                                <option value="relevance">relevance</option>
                                <option value="title">title</option>
                                <option value="likelihood">likelihood</option>
                            </select>
                            <input type="text" class="form-control" onChange={(e) => setsearchKey(e.target.value)} placeholder="Recipient's username" />
                            <button onClick={handleFieldCheckButtonClick} class="btn btn-outline-secondary">Button</button>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">End_year</th>
                                        <th scope="col">Region</th>
                                        <th scope="col">Start Year</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Sector</th>
                                        <th scope="col">relevance</th>
                                        <th scope="col">Likelihood</th>
                                    </tr>
                                </thead>
                                <tbody className="changeTable table-group-divider">
                                    {data.map((el, idx) => {
                                        return (<tr>
                                            <th key={idx}>{idx + 1}</th>
                                            <td>{el.end_year}</td>
                                            <td>{el.region}</td>
                                            <td>{el.start_year}</td>
                                            <td>{el.title}</td>
                                            <td>{el.country}</td>
                                            <td>{el.sector}</td>
                                            <td>{el.relevance}</td>
                                            <td>{el.likelihood}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>) : (
                        <div className='dashloading'>Loading</div>
                    )
                }
            </div>
        </div>
    )
}

export default FilterBoard
