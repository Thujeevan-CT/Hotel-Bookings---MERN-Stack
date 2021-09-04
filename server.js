const express = require('express');
const app = express();
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const BookingsRoute = require('./routes/bookingsRoute');
app.use(express.json());
const path = require('path')

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', BookingsRoute);

    if(process.env.NODE_ENV === 'production'){
        app.use('/', express.static('client/build'))
        app.get('*' , (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
        })
    }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));