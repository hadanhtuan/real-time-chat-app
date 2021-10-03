const $ = document.querySelector.bind(document)
const chatForm = $('#chat-form')
const roomName = $('#room-name')
const users = $('#users')

//get username and room by URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})


var socket = io()

socket.emit('joinRoom', { username, room })

socket.on('message', (msg) => {
    console.log(msg)

    const chatMsgContainer = $('.chat-messages')
    // chatMsgContainer.innerHTML += `
    //     <div class="message">
    //         <p class="meta">Brad <span>9:12pm</span></p>
    //         <p class="text">${msg}</p>
    //     </div> `

    const div = document.createElement('div')
    div.classList.add('message')
    const pMeta = document.createElement('p')
    pMeta.classList.add('meta')
    pMeta.innerHTML = `${msg.userName} <span>${msg.time}</span>`
    const para = document.createElement('p')
    para.classList.add('text')
    para.innerText = msg.text

    div.appendChild(pMeta)                                  
    div.appendChild(para)           
    chatMsgContainer.appendChild(div)                        
    chatMsgContainer.scrollTop = chatMsgContainer.scrollHeight

})

socket.on('room&users', ({room, userList}) => {
    roomName.innerText = room
    users.innerHTML = ''
    userList.forEach((user) => {
        const li = document.createElement('li')
        li.innerText = user.userName
        users.appendChild(li)
    })
    console.log(userList)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const chatMsg = $('#msg')

    socket.emit('chatMessage', chatMsg.value)
    
    chatMsg.value = ''
    chatMsg.focus()

    
})
















