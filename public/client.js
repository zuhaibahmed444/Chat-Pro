const socket = io()

let messagearea = document.querySelector('.message__area')

let name;

let textarea = document.querySelector('#textarea')

do{
    name = prompt('Please enter your name :')

}while(!name)

textarea.addEventListener('keyup',(e)=>{

    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
}
)

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    //Append Message
    appendMessage(msg,'outgoing')
    textarea.value = ' '
    scrollToBottom()

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){

    let maindiv = document.createElement('div')
    let className = type
    maindiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    maindiv.innerHTML = markup

    messagearea.appendChild(maindiv)

    

}

//Recive message

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}
