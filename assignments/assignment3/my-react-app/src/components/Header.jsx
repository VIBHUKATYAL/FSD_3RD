import React from 'react'

const Header = () => {
  return (
    <div style={{display:'flex',backgroundColor:'black',color:'red',justifyContent:'space-evenly'}}>
        <img src="https://nypost.com/wp-content/uploads/sites/2/2024/10/101424-real-annabelle-doll-tony-91623522.jpg?quality=75&strip=all&w=1024" alt="Hotel" height='100px' width='100px' style={{ borderRadius: '50%'}}/>
        <a href="https://nypost.com/2024/10/31/us-news/peek-inside-the-real-life-conjuring-museum-where-you-need-holy-water-to-visit-annabelle/">Home</a>
        <a href="https://www.nbcnews.com/pop-culture/pop-culture-news/conjuring-home-being-sold-1-2-million-one-most-well-n1280067">About Us</a>
    </div>
  )
}

export default Header
