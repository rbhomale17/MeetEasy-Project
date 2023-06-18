const express = require('express');
const CORS = require('cors');
const { photoRouter } = require('./Backend/routes/photos.router');
const { connection } = require('./Backend/config/db');
const { userRouter } = require('./Backend/routes/users.route');
const { authRoute } = require('./Backend/routes/auth.routes');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(CORS())
app.use(cookieParser())

// const staticFilesDir = path.join(__dirname, 'frontEnd');

// Serve static files
// app.use(express.static(staticFilesDir));

app.get('/', (req, res) => {
    res.send('welcome to MeetEasy server')
})

app.use("/", authRoute);
app.use('/photos', photoRouter)
app.use('/users', userRouter)


app.listen(3000, async () => {
    try {
        await connection;
        console.log('connected to DB')
    } catch (error) {
        console.log(error);
        console.log(error.message)
    }
    console.log('Server is running on port http://localhost:3000');
});
