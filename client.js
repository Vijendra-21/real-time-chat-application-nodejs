const socket = io('https://goraji.github.io/real-time-chat-application-nodejs.github.io/');
let userName ;
let messageInp = document.querySelector('#messageInp');
let messageArea = document.querySelector('.messageArea')
do {
    userName = prompt(`plz enter your name: `)
} while (!userName)


socket.on('recieve',(data)=>{
    append(`${data.name}: ${data.message}`,'left')
    scrollToBottom();
})


socket.emit('new-user-joined',userName)
socket.on('user-joined',(user)=>{
    append(`${user} joined!!!`,'center')
    scrollToBottom();
}) 

socket.on('left',(names)=>{
    append(`${names} left!!!`,'center')
})

function append(msg,position){
    let mainDiv = document.createElement('div');
    mainDiv.innerText = msg;
    mainDiv.classList.add('message')
    mainDiv.classList.add(position)
    messageArea.append(mainDiv)
    scrollToBottom();
}
messageInp.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        let msg = messageInp.value;
        append(`You :${msg}`,'right');
        messageInp.value = ''
        socket.emit('send',msg);  
    }
})
function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight; 
}

