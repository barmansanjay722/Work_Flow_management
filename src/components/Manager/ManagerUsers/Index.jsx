import React from 'react'
import UserHeader from './UserHeader'
import UserBody from './UserBody'
import {useState} from "react";
const Users = () => {
  const [renderActiveCoder,setRenderActiveCoder] = useState(true);

  const handleActiveCoder = () =>{
    setRenderActiveCoder(false);
  }
  
  return (
    <>
    <UserHeader renderActiveCoder={renderActiveCoder} />
    <UserBody handleActiveCoder={handleActiveCoder} />
    </>
  )
}
export default Users