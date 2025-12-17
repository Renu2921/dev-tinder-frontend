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
   <div className="h-[5rem] sticky top-0 navbar bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 shadow-sm">
  <div className="flex-1">
    <div className='flex items-center'>
     <img src="/TinderLogo.png" className="w-20 h-20"/>
    <Link to="/" className="font-bold text-[2rem] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] cursor-pointer">
    Dev Tinder</Link>
    </div>
  </div>
  {userData && (
    <div className="flex justify-center items-center  gap-2 mr-7">
    <p className=' flex  gap-2 text-white font-semibold text-xl'>Welcome<span>{userData?.firstName}!</span></p>
    <div className="dropdown dropdown-end w-full">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-full">
        <div className="w-12 h-12   rounded-full">
          <img
            alt="profileImage"
            src={userData?.imageUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
