import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Room({ room, fromDate ,toDate }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row bs room'>
            <div className="col-md-4">
                <img src={room.imageurls[0]} className="smallimg" />
            </div>
            <div className="col-md-7">
                <h1 style={{color: '#203A43'}}>{room.name}</h1>
                <b>
                    <p>Max Count : {room.maxcount}</p>
                    <p>Phone Number : {room.phonenumber}</p>
                    <p>Type : {room.type}</p>
                </b>

                <div style={{ float: 'right' }}>

                    {(fromDate && toDate) && (
                        <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                        <button className="btn btn-own">Book now</button>
                        </Link>
                    )}

                    
                    <button className="btn btn-own" onClick={handleShow}>View Details</button>
                </div>

            </div>


            <Modal show={show} onHide={handleClose} size='lg'>

                <Modal.Header>
                    <Modal.Title style={{color: '#203A43'}}>{room.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Carousel prevLabel='' nextLabel=''>
                        
                        {room.imageurls.map(url=>{
                            return <Carousel.Item>
                            <img
                                className="d-block w-100 bigimg"
                                src={url}
                            />
                        </Carousel.Item>
                        })}

                    </Carousel>

                    <p>{room.description}</p>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{color: '#000'}}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>


        </div>
    )
}

export default Room
