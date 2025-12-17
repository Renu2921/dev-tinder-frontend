import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../store/loginSlice'
import axios from 'axios'

const Body = () => {
  const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation();
    const userData=useSelector((store)=>store.login.userData);
  useEffect(() => {
  if (location.pathname === "/login" || location.pathname === "/signup") return;
  loggedInUser();
}, [location.pathname]);

  const loggedInUser=async()=>{ 
    if(userData) return;
    try{
     const response=await axios.get(BASE_URL +"/profile/view",{
      withCredentials: true
    });
    dispatch(setUserData(response.data.data));
    }catch(error){
       toast.error(error.response.data.message);
      if(error.response?.status === 401){
         navigate("/login");
      }
     
    }
   
  }
  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-500 via-red-500 to-orange-500 opacity-90'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Body
