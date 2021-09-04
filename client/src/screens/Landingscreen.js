import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
    return (
        <div className="Raw landing">

            <div className="col-md-12 text-center cent">
                <h3>Hotel Rooms Bookings</h3>
                <Link to="/home">
                    <button className="btn btn-own">Get Started</button>
                </Link>
            </div>

        </div>
        
    )
}

export default Landingscreen
