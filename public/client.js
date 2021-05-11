const socket = io();
let names ;
let messageInp = document.querySelector('#messageInp');
let messageArea = document.querySelector('.messageArea')

do {
    names = prompt(`plz enter your name: `)
} while (!names)

messageInp.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    // console.log(message);
    let msg={
        user : names,
        message : message.trim()
    }

    //append smg
    appendMessage(msg,'right')
    messageInp.value = ''
    scrollToBottom();

    //send to server
    socket.emit('message',msg)
     
}
function appendMessage(msg,type){
    
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message')

    let markup= `
        <h3>${msg.user}</h3>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

//recive the incoming msg
socket.on('message',(msg)=>{
    appendMessage(msg,'left')
    scrollToBottom();
})

function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight;
}



