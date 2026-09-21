import React from 'react'
import Student1 from './component/Student1'

function App() {
  return (
    <div>
      <h1>MY STUDENT RECORDS</h1>
      <div style={{display:'flex' , justifyContent:'space-between' , margin:'0px 100px'}}>
      <Student1></Student1>
      <br/>
      <Student1></Student1>
      <br/>
      <Student1></Student1>
      </div>
    </div>
  )
}

export default App
