import React from 'react'
import drawCircle from './utilities/canvasLoadAnimation'

const Mem = (mem) =>  {
  const {totalMem, usedMem, memUsage, freeMem} = mem.mem

  return <>
<div className='col-sm-3 mem'></div>
<h3>Memory Usage</h3>
<div className="canvas-wrapper">
<canvas className="memCanvas" width="200" height="200">{drawCircle(document.querySelector('.memCanvas'), memUsage * 100 )}</canvas>
<div className="mem-text">
  {memUsage *100}
</div>
</div>
<div>
  Total Memory: {(totalMem /1073741824 * 100)/100}GB Ram
</div>
<div>
  Free Memory: {Math.floor(freeMem/1073741824 * 100)/100}GB
</div>
  </>
  
  }
  
  
  export default Mem