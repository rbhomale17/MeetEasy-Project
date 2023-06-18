
const chatBtn = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const urlParams = new URLSearchParams(window.location.search)

const username = urlParams.get('username');
const room = urlParams.get("room");



const socket = io("https://meeteasy-chat.onrender.com", { transports: ["websocket"] });
// const socket = io();

socket.emit("joinRoom", ({ username, room }));

socket.on("roomname", (room) => {
    let para = document.createElement("p")
    para.className = "RoomName"
    para.innerText = `Room Name :- ${room}`

    //  console.log(room)
    roomName.append(para)
})

socket.on("message", (message) => {
    // outputMessage(message);
    DispalyMessage(message)

})

// Sending message

let inputel = document.getElementById("msg2")
let msgbtn = document.getElementById("msgbtn")
chatBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    let msg = inputel.value
    // console.log(msg)
    socket.emit("chatmessage", msg)
    inputel.value = ''
})



socket.on("allusers", (users) => {
    // userList.innerHTML=""
    users.forEach(ele => {
        let list = document.createElement("li")
        list.innerText = ele.username
        userList.append(list)
    });
})

//outPut message

function DispalyMessage(message) {
    let div = document.createElement("div")
    div.className = "card"
    const name = document.createElement("h5")
    name.innerText = message.username
    // console.log(message.username,message.text,message.time)
    let text = document.createElement("h5")
    text.innerText = message.text
    let time = document.createElement("p")

    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zeros to minutes and seconds if necessary
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const formattedTime = hours + ":" + minutes + " " + amOrPm;
    // console.log(formattedTime);

    time.innerText = formattedTime

    div.append(name, text, time)

    chatMessages.append(div)
}


let leavbtn = document.getElementById("leave-btn")
leavbtn.addEventListener("click", () => {
    console.log('clicked')
    let leavel = confirm("Are you Sure")
    if (leavel) {
        window.location.href = "https://meeteasy.netlify.app/landing.html"
    }
})

