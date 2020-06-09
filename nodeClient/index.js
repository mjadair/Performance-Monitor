const os = require('os')


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
// number of cores
//clock speed

