import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../store/loginSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userData=useSelector((store)=>store.login.userData);

  const handleLogout=async()=>{
     try{
     const response= await axios.post(BASE_URL+"/logout",{
       withCredentials: true
     })
     dispatch(removeUser());
      toast.success("Logout Successfully");
      navigate("/login");
     }catch(error){
      toast.error(error.response.data.message);
     }
  }
  return (
   <>
   <div className="h-[5rem] sticky top-0 navbar bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 shadow-sm z-50">
  <div className="flex-1">
    <div className='flex items-center'>
     <img src="/TinderLogo.png" className="w-12 h-12 md:w-20 md:h-20"/>
    <Link to="/" className="font-bold text-[1.4rem] md:text-[2rem]  text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] cursor-pointer">
    DevTinder</Link>
    </div>
  </div>
  {userData && (
    <div className="flex flex-col-reverse  md:flex-row md:justify-center md:items-center gap-2 mr-2 md:mr-7">
    <p className='flex  gap-1 md:gap-2 text-white font-semibold text-sm md:text-2xl '>Welcome<span>{userData?.firstName}!</span></p>
    <div className="dropdown dropdown-end w-full">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-full">
        <div className="w-12 h-12 border-2 rounded-full ml-10 md:ml-0">
          <img
            alt="profileImage"
            src={userData?.imageUrl} 
            className='w-12 h-12' />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 sm:w-40 md:w-52 p-2 shadow">
        <li>
          <Link  to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections ">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
  
</div>

   </>
  )
}

export default Navbar
