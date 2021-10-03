var userList = []

function addUser(socketId, userName, room) { //socketId, userName, room
    const user = {
        id: socketId,
        userName: userName,
        room: room
    }
    userList.push(user)
    return user
}

function getUser(id) {
    return userList.find((user) => {
        return user.id == id
    })
}

function getUsersByRoom(room) {
    return userList.filter((user) => {
        return user.room === room  // ngu lz quên return
    })


}

function removeUser(id) {
    const index = userList.findIndex((user) => {
        user.id == id
    })

    return userList.splice(index, 1)[0]
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getUsersByRoom
}
















