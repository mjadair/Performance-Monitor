import React from 'react'
import drawCircle from './utilities/canvasLoadAnimation'

const CPU = (cpu) =>  {

  console.log(cpu.cpu)

return <>
<div className="col-sm-3 cpu"> 
<h3>CPU Load</h3>
<div className="canvas-wrapper">

<canvas className="canvas" width="200" height="200">{drawCircle(document.querySelector('.canvas'), cpu.cpu.cpuLoad )}</canvas>
<div className="cpu-text" >{cpu.cpu.cpuLoad}%</div>
</div>


</div>

</>

}


export default CPU