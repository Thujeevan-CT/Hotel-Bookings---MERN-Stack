import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function Bookingscreen({ match }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();

    const roomid = match.params.roomid;
    const fromDate = moment(match.params.fromDate, 'DD-MM-YYYY');
    const toDate = moment(match.params.toDate, 'DD-MM-YYYY');

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

    const [totalAmount, setTotalAmount] = useState()

    useEffect(async () => {

        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }

        try {
            setLoading(true)
            const data = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data;
            setTotalAmount(data.rentperday * totalDays);
            setRoom(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }

    }, [])




    async function onToken(token){
        console.log(token)

        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }

        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setLoading(false)
            Swal.fire('Congratulations' , 'Your Room Booked Successfully' , 'success').then(result => {
                window.location.href='/profile'
            })
        } catch (error) {
            setLoading(false)
            Swal.fire('OOps' , 'Something went wrong' , 'error')
        }
    }

    return (
        <div className="m-5">

            {loading ? (<Loader />) : room ? (<div>

                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-6">
                        <h1 style={{color: '#203A43'}}>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{color: '#203A43'}}>Booking Details</h1>
                            <hr />

                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date : {match.params.fromDate}</p>
                                <p>To Date : {match.params.toDate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount : </h1>
                                <hr />

                                <p>Total Days : {totalDays}</p>
                                <p>Rent per Day : {room.rentperday}</p>
                                <p>Total Amount : {totalAmount}</p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>
                            

                            <StripeCheckout
                                amount={totalAmount * 100}
                                token={onToken}
                                currency='INR'
                                stripeKey="pk_test_51JQUDwE8TBaYgLGpfxcamVgstSVHFq3ll0C5nfn59FeJgKA17aApMerDLEp0x373ODYwaROWzOvnJP8bseBkzhzY00sr0ZhHPU"
                            >

                                <button className="btn btn-own">Pay Now</button>

                            </StripeCheckout>


                        </div>

                    </div>
                </div>

            </div>) : (<Error message="Something went wrong. Try again." />)}

        </div>
    )
}

export default Bookingscreen
