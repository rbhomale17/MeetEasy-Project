const express = require('express');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')


const app = express();
app.use(express.json())
app.use(cors())

app.set("view engine", "ejs")
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render("door")
})

app.set('view engine', 'ejs'); // Set EJS as the template engine

app.get('/view', (req, res) => {
    console.log(__dirname);
  res.render('door'); // Replace 'your-ejs-file' with the actual filename (without the extension) of your EJS file
});

app.get('/room', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})
app.get('/:room', (req, res) => {
    res.render("room", { roomId: req.params.room })
})


const PORT=process.env.port || 8080
const server = app.listen(PORT, () => {
    console.log(`Video Call Server is running at PORT ${PORT}`)
})

const io = require('socket.io')(server)

// Peer

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peerjs", peerServer);
 
io.on('connection', (socket) => {
    console.log("New Connection at " + socket.id)
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })
        socket.on("message", (message) => {
            io.to(roomId).emit("createMessage", message);
        });
    });
})

