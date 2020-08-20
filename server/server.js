const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const path = require("path");
const uuid = require('uuid');
const _ = require('lodash');

const rooms = {};
const locations = {};




app.use("/", express.static(path.join(__dirname + '/../clients/')));
const server = http.createServer(app);
const io = socketio(server);



const joinRoom = (socket, room) => {
    room.sockets.push(socket);
    socket.join(room.id, () => {
      // store the room id in the socket for future use
      socket.roomId = room.id;
      console.log(socket.id, "Joined", room.id);
    });
  };
  

io.on("connection" ,function(sock){
    //unique user id 
  sock.id = uuid.v4();
  console.log('a user connected');
  sock.on("getUser", function(username){
    sock.nickname = username;
    
 
    console.log(username);


    sock.on('createRoom', () => {
        const room = {
          id: uuid.v4(), // generate a unique id for the new room, that way we don't need to deal with duplicates.
          sockets: []
        };
        rooms[room.id] = room;
        // have the socket join the room they've just created.
        joinRoom(sock, room);
        
        
      });
    




});




    
});

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/../clients/index.html"));
})

server.on("error",function(err){
    console.error("error" + error);
})

server.listen(3000,function(){

    console.log("game started on 3000");
});