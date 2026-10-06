import React from 'react'
import { useState } from 'react';

const CounterApp = () => {
    const [Count, setCount]=useState(0);
    function inc(){
        setCount(Count+1)
    }
    function dec(){
        setCount(Count-1);
    }
  return (
    <div style={{border:'2px solid purple', height:'400px'}}>
        <center>
      <h1>Counter App</h1>
      <button onClick={inc}>ADD +</button>
      <br/>
      <span>{Count}</span>
      <br/>
      <button onClick={dec}>SUB -</button>
      </center>
    </div>
  )
}

export default CounterApp
