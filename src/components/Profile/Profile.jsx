import React, { useContext, useEffect } from 'react'
import Style from './Profile.module.css'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from "../../context/User/context";

export default function Profile() {

  
  let {userData}=useContext(UserContext)

  useEffect(()=>{
    let encodedToken=localStorage.getItem('userToken')
    let decodedToken=jwtDecode(encodedToken)
  },[])



  return <>
    <h1>Name : {userData?.name}</h1>
    <h1>Email : {userData?.email}</h1>
  </>
}
