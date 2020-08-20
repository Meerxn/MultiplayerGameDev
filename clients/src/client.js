



// const writeEvent = function(text){
//     // ul element
//     const parent = document.querySelector("#events")
//     // li element 

//     const el = document.createElement("li");
//     el.innerHTML = text;
//     parent.appendChild(el);
// }

const onCreate = function(){
  
 
    sock.emit("createRoom");
    window.location.replace("gameroom.html");

}
const onUsr = function(e){
    alert("he");
    e.preventDefault();
    console.log("entry");
   const username = document.querySelector("#usr").value;
   alert(username);
   sock.emit("getUser" , username);
   document.querySelector("#username").innerHTML = "Username: " + username;
}

//writeEvent("welcome to rps");
const sock = io();
// sock.on("message",function(text){
//     writeEvent(text);
//     })

document.querySelector("#create").addEventListener("click",onCreate);
document.querySelector("#usrSet").addEventListener("submit",onUsr);
