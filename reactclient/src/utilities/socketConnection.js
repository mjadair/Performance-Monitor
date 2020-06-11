import io from 'socket.io-client'
let socket = io.connect('http://localhost:8000')


socket.emit('clientAuth', 'kzjevb--vbjvhsbrb' )

// console.log(socket)

export default socket