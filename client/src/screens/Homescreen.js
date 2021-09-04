import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment'


const { RangePicker } = DatePicker;


function Homescreen() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState();

    const [searchKey, setSearchKey] = useState('');
    const [type, setType] = useState('all');

    useEffect(async () => {

        try {
            setLoading(true)

            const data = (await axios.get('/api/rooms/getallrooms')).data
            // console.log(data);
            setRooms(data);
            setDuplicateRooms(data);
            setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error);
            setLoading(false)
        }

    }, [])

    function filterByDate(dates) {
        setFromDate(moment(dates[0]).format('DD-MM-YYYY'))
        setToDate(moment(dates[1]).format('DD-MM-YYYY'))

        var tempRooms = []

        for (const room of duplicateRooms) {
            var availability = false

            if (room.currentbookings.length > 0) {

                for (const booking of room.currentbookings) {

                    if (
                        !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                        && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                    ) {

                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromDate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.toDate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromDate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.toDate
                        ) {
                            availability = true
                        }

                    }

                }

            }

            if (availability || room.currentbookings.length == 0) {
                tempRooms.push(room)
            }

            setRooms(tempRooms)

        }

    }

    function filterBySearch() {

        const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()))

        setRooms(tempRooms);

    }

    function FilterByType(e) {

        setType(e)

        if (e !== 'all') {
            const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() == e.toLowerCase())

            setRooms(tempRooms)
        } else {
            setRooms(duplicateRooms)
        }

    }

    return (
        <div className='container'>

            <div className="row mt-5 bs">

                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>

                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Search rooms" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch} />
                </div>

                <div className="col-md-3">
                    <select className="form-control" value={type} onChange={(e) => { FilterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>

            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (<Loader />) : (

                    rooms.map(room => {

                        return <div className="col-md-9 mt-3">
                            <Room room={room} fromDate={fromDate} toDate={toDate} />
                        </div>

                    })

                )}
            </div>

        </div>
    )
}

export default Homescreen;
