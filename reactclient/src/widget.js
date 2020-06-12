import React from 'react'
import Cpu from './cpu'
import Mem from './mem'
import Info from './info'
import './widget.css'

const Widget = (data) => {

  const { macAddress, freeMem, totalMem, usedMem, memUsage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad, isActive } = data.data
  const cpu = { cpuLoad }
  const mem = { totalMem, usedMem, memUsage, freeMem }
  const info = { macAddress, osType, upTime, cpuModel, numCores, cpuSpeed }
  let notActiveDiv = ''


  if (!isActive) {
    notActiveDiv = <div className="not-active">Offline</div>
  }

  return <div className="widget col-sm-12">
    {notActiveDiv}
    <Cpu cpu={cpu} />
    <Mem mem={mem} />
    <Info info={info} />

  </div>

}

export default Widget