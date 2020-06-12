const os = require('os')
const io = require('socket.io-client')
const socket = io('http://127.0.01:8000')


socket.on('connect', () => {
  // console.log('This is connected to the server Array.')
  const networkInterface = os.networkInterfaces()
  let macAddress


  for (let key in networkInterface) {

    // macAddress = Math.floor(Math.random * 3) + 1
    // break


    if (!networkInterface[key][0].internal) {
      if (networkInterface[key][0].internal === '00:00:00:00:00:00') {
        macAddress = Math.random().toString(36).substr(2, 15)
      } else {
        macAddress = networkInterface[key][0].mac
        break
      }
    }
  }

  performanceData().then((allPerformanceData) => {
    allPerformanceData.macAddress = macAddress
    socket.emit('initPerfData', allPerformanceData)
  })



  socket.emit('clientAuth', 'rkjbaa-XB-vblbgaeiu47t85q9')


  let performanceDataInterval = setInterval(() => {
    performanceData().then((allPerformanceData) => {
      allPerformanceData.macAddress = macAddress
      socket.emit('perfData', allPerformanceData)
    })
  }, 1000)

  socket.on('disconnect', () => {
    clearInterval(performanceDataInterval)
  })



})


//!CPU Load



function performanceData() {
  return new Promise(async (resolve, reject) => {

    const cpus = os.cpus()

    //! Memory Usage
    //free
    const freeMem = os.freemem()
    // console.log(freeMem)

    //total
    const totalMem = os.totalmem()
    // console.log(totalMem)

    //mem usage
    const usedMem = totalMem - freeMem
    const memUsage = Math.floor(usedMem / totalMem * 100) / 100

    // console.log(memUsage)


    //!OS Type
    const osType = os.type() === 'Darwin' ? 'Mac' : os.type()
    // console.log(osType)

    //!uptime
    const upTime = os.uptime()
    // console.log(upTime)


    //! CPU Into

    //type
    const cpuModel = cpus[0].model

    // console.log('cpu Model: ', cpuModel)

    // number of cores
    const numCores = cpus.length

    // console.log('number of cores: ', numCores)

    //clock speed
    const cpuSpeed = cpus[0].speed
    const cpuLoad = await getCPULoad()
    const isActive = true

    // console.log(cpuSpeed)

    resolve({ freeMem, totalMem, usedMem, memUsage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad, isActive })

  })

}


function cpuAverage() {
  const cpus = os.cpus()

  let idleMS = 0
  let totalMS = 0

  cpus.forEach((core) => {
    //loop through each property of the current core
    for (type in core.times) {
      totalMS += core.times[type]
    }
    idleMS += core.times.idle
  })
  return {
    idle: idleMS / cpus.length,
    total: totalMS / cpus.length
  }

}





function getCPULoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage()
    setTimeout(() => {
      const end = cpuAverage()
      const idleDifference = end.idle - start.idle
      const totalDifference = end.total - start.total
      // console.log(idleDifference, totalDifference)
      const percentageCPU = 100 - Math.floor(100 * idleDifference / totalDifference)
      resolve(percentageCPU)
    }, 100)

  })
}


