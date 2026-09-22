import React from 'react'

const Card = () => {
  return (
    <div style={{display:'block',border:'2px solid red',color:'white',width:'300px',height:'300px',alignItems:'center'}}>
        <center>
      <h3>Pizza</h3>
      <img src="https://www.liveeatlearn.com/wp-content/uploads/2025/09/Veggie-Pizza-12.jpg" alt="Pizza" height='100px' width='100px' style={{borderRadius:'50%',objectFit:'cover'}} />
      <h3>100$</h3>
      </center>
    </div>
  )
}

export default Card
