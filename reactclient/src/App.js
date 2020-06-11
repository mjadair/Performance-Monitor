import React, { useState, useEffect } from 'react';
import './App.css';

import socket from './utilities/socketConnection'
import Widget from './widget'


const App = () => {
  const [performanceData, updatePerformanceData] = useState({})
  let widgets = []

  


  useEffect(() => {
    socket.on('data', (data) => {
      updatePerformanceData(data)
    })
  })


 


  return (
  
    <>
    <div className="App">
      {/* {widgets} */}
      <Widget data={performanceData} />
    </div>
    </>
  );
}

export default App;
