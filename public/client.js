const socket = io();
let userName ;
let messageInp = document.querySelector('#messageInp');
let messageArea = document.querySelector('.messageArea')
do {
    userName = prompt(`plz enter your name: `)
} while (!userName)

messageInp.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        var msg={
            user : userName,
            message : e.target.value
        }
        appendMessage(msg,'right');
        socket.emit('message',msg)  
        messageInp.value = ''
        scrollToBottom();
    }
})
 
function appendMessage(msg,position){
    let mainDiv = document.createElement('div');
    let className = position;
    mainDiv.classList.add(className,'message')
    let markup= `<p><b>${msg.user}: </b> ${msg.message}</p>`
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'left')
    scrollToBottom();
})

function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight; 
}
const apendNewUser = (msg,position)=>{
    let mainDiv = document.createElement('div');
    let className = position;
    mainDiv.classList.add(className,'message')
    let markup= `<p><b>${msg}: </b> joined chat!!</p>`
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

socket.emit('new-user-joined',userName)
socket.on('user-joined',(userName)=>{
    apendNewUser(userName,'left')
    scrollToBottom();
}) 


