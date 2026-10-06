import React from 'react'
import { useState } from 'react';

const CounterApp = () => {
    const [Count, setCount]=useState(300);
    const [Count1, setCount1]=useState(300);
    function inc(){
        setCount(Count+10)
    }
    function dec(){
        setCount(Count-10);
    }
    function inc1(){
        setCount1(Count1+10)
    }
    function dec1(){
        setCount1(Count1-10);
    }
  return (
    <div style={{border:'2px solid purple'}}>
      <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbpIo-q-BYduwphaPF_DRlp3YdBQ_K_QoRVQ918-TWA&s=10" alt="" height={Count} width={Count1}/></span>
      <span>{Count}x{Count1}</span>
      <br />
      <button onClick={inc}>Height +</button>
      <button onClick={dec}>Height -</button>
      <br/>
      <button onClick={inc1}>Width +</button>
      <button onClick={dec1}>Width -</button>
      <br/>
    </div>
  )
}

export default CounterApp
