import React from 'react'
import Cpu from './cpu'
import Mem from './mem'
import Info from './info'
import './widget.css'

const Widget = (data) => {

  const { macAddress, freeMem, totalMem, usedMem, memUsage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad } = data.data
  const cpu = {cpuLoad}
  const mem = {totalMem, usedMem, memUsage, freeMem}
  const info = {macAddress, osType, upTime, cpuModel, numCores, cpuSpeed}

  return <>
    <Cpu cpu={cpu}/>
    <Mem mem={mem}/>
    <Info info={info}/>

  </>

}

export default Widget