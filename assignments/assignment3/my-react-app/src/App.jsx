import React from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Mocktail from './components/Mocktail'
import Pasta from './components/Pasta'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header></Header>
      <h1>TATYA VICHU KI PATNI KA HOTEL</h1>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
      <Card></Card>
      <Pasta></Pasta>
      <Mocktail></Mocktail>
      </div>
      <br></br>
      <Footer></Footer>
    </div>
  )
}

export default App


