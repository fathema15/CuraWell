import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'


const MyProfile = () => {
  const [UserData,setUserData] = useState({
    name:"Shoaibur Rahman",
    image: assets.profile_pic,
    email: 'shoaiburrahman880@gmail.com',
    phone: '+0 123 456 7890',
    address:{line1: "57th Cross, Richmond ",
             line2:"Circle, Church Road, London"
            },
    gender:'Male',
    dob:"2000-01-20"
  })
  const [isEdit,setIsEdit] = useState(false)
  return (
    <div>
      <img src={UserData.image} alt="" />
      {isEdit
      ?<input type="text" value ={UserData.name} onChange={e=> setUserData(prev=>({...prev,name:e.target.value}))}/>
      // :<p>{UserData.name}</p>
      :<p>{UserData.name}</p>

      }
      <hr>
        <div>
          <p> Contact Information  </p>
            
            <div>
              <p>Email Id:</p>
              <p>{UserData.email}</p>
            </div>

        </div>
      </hr>
      
    </div>
  )
}

export default MyProfile
