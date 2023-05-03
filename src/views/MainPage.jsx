import React from 'react'
import '../App.css';
import '../components/TheNav'
import pic from '../images/pic2.jpg'
export default function MainPage() {
  return (
   <section>
        <img src={pic} alt="" />
        <div className="centered"><span>Welcome <br /> to the <br /> School Web Site</span></div>
   </section>
    
  )
}
