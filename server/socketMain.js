const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/perfData', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))


const Machine = require('./models/Machine')


function socketMain(io, socket) {
  let macAddress
  // console.log('This is socketMain being called', socket.id)

  socket.on('clientAuth', (key) => {
    if (key === 'rkjbaa-XB-vblbgaeiu47t85q9') {
      socket.join('clients')
    } else if (key === 'kzjevb--vbjvhsbrb') {
      socket.join('ui')
      console.log('A React client has joined')
      Machine.find({}, (err, docs) => {
        docs.forEach((aMachine) => {
          //on load, assume that all machines are offline
          aMachine.isActive = false
          io.to('ui').emit('data', aMachine)
        })
      })
    } else {
      socket.disconnect(true)
    }
  })

  socket.on('disconnect', () => {
    Machine.find({ macAddress: macAddress }, (err, docs) => {
      if (docs.length > 0) {
        docs[0].isActive = false
        io.to('ui').emit('data', docs[0])
      }
    })
  })



  socket.on('initPerfData', async (data) => {
    // console.log(data)
    macAddress = data.macAddress

    const mongooseResponse = await checkAndAdd(data)
    console.log(mongooseResponse)
  })

  //a machine has connected, check to see if new - if it is, add it
  socket.on('perfData', (data) => {
    console.log('Tick')
    io.to('ui').emit('data', data)
  })

}


function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne(
      { macAddress: data.macAddress },
      (err, doc) => {
        if (err) {
          reject(err)
          throw err
          // reject(err)
        } else if (doc === null) {
          let newMachine = new Machine(data)
          newMachine.save()
          resolve('added')
        } else {
          resolve('found')
        }
      }
    )
  })
}

module.exports = socketMain