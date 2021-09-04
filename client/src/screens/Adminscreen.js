import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import { localeData } from 'moment';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function Adminscreen() {


    useEffect(() =>{

        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }

    }, [])

    return (
        <div className="ml-3 mr-3 mt-3 bs">
            <h1 className="text-center"><b style={{ fontSize: '33px' }}>Admin Panel</b></h1>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>

        </div>
    )
}

export default Adminscreen

// Booking List Component

export function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {


        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
            setBookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }, [])

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Bookings</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td> {booking._id} </td>
                                <td> {booking.userid} </td>
                                <td> {booking.room} </td>
                                <td> {booking.fromDate} </td>
                                <td> {booking.toDate} </td>
                                <td> {booking.status} </td>
                            </tr>
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )

}

// Rooms List Component

export function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {


        try {
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            setRooms(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }, [])

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Rooms</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td> {room._id} </td>
                                <td> {room.name} </td>
                                <td> {room.type} </td>
                                <td> {room.rentperday} </td>
                                <td> {room.maxcount} </td>
                                <td> {room.phonenumber} </td>
                            </tr>
                        }))}
                    </tbody>

                </table>



            </div>

        </div>
    )

}



// Users List Component


export function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {


        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }, [])

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Rooms</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length && (users.map(user => {
                            return <tr>
                                <td> {user._id} </td>
                                <td> {user.name} </td>
                                <td> {user.email} </td>
                                <td> {user.isAdmin ? 'YES' : 'NO'} </td>

                            </tr>
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )

}


// Add Room Component

export function Addroom(){

    const [name, setName] = useState('');
    const [rentperday, setRentperday ] = useState();
    const [maxcount, setMaxcount ] = useState();
    const [description, setDescription ] = useState();
    const [phonenumber, setPhonenumber ] = useState();

    const [type, setType] = useState();
    const [imgurl1, setImgurl1] = useState();
    const [imgurl2, setImgurl2] = useState();
    const [imgurl3, setImgurl3] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function addRoom(){

        const newroom= {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imgurl1, imgurl2, imgurl3]
        }

        try {
            setLoading(true);
            const result = await (await axios.post('/api/rooms/addroom' , newroom)).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congratulations' , 'Room Added Successfully' , 'success').then(result => {
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('OOps' , 'Something went wrong' , 'error')
        }

    }
    
    return (
        <div className="row">
            <div className="col-md-5">
                
                <input type="text" className='form-control' placeholder='room name'
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='rent per day'
                    value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='max count'
                    value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='description'
                    value={description} onChange={(e)=>{setDescription(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='phone number'
                    value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}
                />

            </div>
            
            <div className="col-md-5">

                <input type="text" className="form-control" placeholder='Deluxe / Non-Deluxe'
                    value={type} onChange={(e)=>{setType(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 1'
                    value={imgurl1} onChange={(e)=>{setImgurl1(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 2'
                    value={imgurl2} onChange={(e)=>{setImgurl2(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 3'
                    value={imgurl3} onChange={(e)=>{setImgurl3(e.target.value)}}
                />

                <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={addRoom}>Add Room</button>

            </div>

            {loading && (<Loader />)}

        </div>
    )
}