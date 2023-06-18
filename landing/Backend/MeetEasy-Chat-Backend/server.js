
const express = require("express");
const app = express();
const socketio = require("socket.io");

const http = require("http");


const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/users");


const formateMessage = require("./utils/messages");


// server connection 

const server = http.createServer(app);
const io = socketio(server);


// const defaultNPS = io.of("/");


io.on("connection",(socket)=>{

    console.log("One user has joined");

    socket.on("joinRoom",({username,room})=>{

      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome message 
      socket.emit("message",formateMessage("MeetEasy","Welcome to MeetEasy"));
      socket.emit("roomname",room)
      // Broadcasting other users
      socket.broadcast.to(user.room).emit("message",formateMessage("MeetEasy",`${username} has joined the chat`));

     

      // getting room users.
      io.to(user.room).emit("allusers",getRoomUsers(room))
 
    });

     socket.on("chatmessage",(msg)=>{
       
console.log(msg)

        const user = getCurrentUser(socket.id);

        console.log(user.room)
        io.to(user.room).emit("message",formateMessage(user.username,msg));

     });

    
    socket.on("disconnect",()=>{

    const user = userLeave(socket.id);
        console.log("one user left");

          // Broadcasting other users on leaving 
       io.to(user.room).emit("message",formateMessage("MeetEasy",`${user.username} has left the chat`));
 
       // getting room users.
  io.to(user.room).emit("allusers",{
    room:user.room,
    users:getRoomUsers(user.room)
 })
// io.to(user.room).emit("allusers",getRoomUsers(room))
 
        })
})


const PORT = 7979;

server.listen(PORT, ()=>{
    console.log("server is running on port"+PORT)
});