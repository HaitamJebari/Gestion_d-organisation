import React from 'react'
import '../App.css';
import pic from '../images/pic2.jpg'
export default function MainPage() {
  return (
    <div className='main'>

        <img src={pic} alt="" />
        <div className="centered"><span>welcome <br /> to the <br /> school web site</span></div>
      
    </div>
  )
}
