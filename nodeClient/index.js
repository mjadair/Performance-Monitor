const os = require('os')
const cpus = os.cpus()


//!CPU Load




//! Memory Usage
//free
const freeMem = os.freemem()
console.log(freeMem)

//total
const totalMem = os.totalmem()
console.log(totalMem)

//mem usage
const usedMem = totalMem - freeMem
const memUsage = Math.floor(usedMem / totalMem * 100) / 100

console.log(memUsage)


//!OS Type
const osType = os.type() === 'Darwin' ? 'Mac' : os.type()
console.log(osType)

//!uptime
const upTime = os.uptime()
console.log(upTime)


//! CPU Into

//type
const cpuModel = cpus[0].model

console.log('cpu Model: ', cpuModel)

// number of cores
const numCores = cpus.length

console.log('number of cores: ', numCores)

//clock speed
const cpuSpeed = cpus[0].speed

console.log(cpuSpeed)


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
  const start = cpuAverage()
  setTimeout(() => {
    const end = cpuAverage()
    const idleDifference = end.idle - start.idle
    const totalDifference = end.total - start.total
    // console.log(idleDifference, totalDifference)
    const percentageCPU = 100 - Math.floor(100 * idleDifference / totalDifference)
    console.log(percentageCPU)
  }, 100)
}

setInterval(() => {
  getCPULoad()
}, 1000)
