import React from 'react'
import '../App.css';
import pic from '../images/pic2.jpg'
export default function MainPage() {
  return (
   <section>
        <img src={pic} alt="" className='pic'/>
        <div className="centered"><span>Welcome <br /> to the <br /> School Web Site</span></div>
   </section>
    
  )
}
