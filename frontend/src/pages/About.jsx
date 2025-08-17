import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p> ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]'src={assets.about_image} alt="" />
        <div className=' flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p></p>
          <p></p>
          <b className='text-gray-800'>Our Vision</b>
          <p></p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semi'>CHOOSE US</span></p>
      </div>
      <div>
          <div>
            <b>EFFICIENCY:</b>
            <p></p>
          </div>

          <div> 
            <b>CONVENIENCE:</b>
            <p></p>  
          </div>

          <div>
            <b>PERSONALIZATION:</b>
            <p></p>
          </div>
      </div>    
    </div>
  )
}

export default About
