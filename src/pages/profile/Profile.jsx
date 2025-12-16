import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import FeedCard from '../feed/FeedCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate=useNavigate();
  console.log("profile mounted");
  const userData = useSelector((store) => store.login.userData);
  
  return (
    <div className='flex w-full justify-center items-start gap-10'>
      <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-6 mt-20">
        
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={userData?.imageUrl}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-400"
          />
        </div>

        {/* Name & Age */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {userData?.firstName} {userData?.lastName}
            <span className="text-gray-500 text-lg">, {userData?.age}</span>
          </h2>
          <p className="text-sm text-gray-500 capitalize mt-1">
            {userData?.gender}
          </p>
        </div>

        {/* Email */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">{userData?.email}</p>
        </div>

        {/* About */}
        <div className="mt-4 bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-700">{userData?.about}</p>
        </div>

        {/* Skills (optional) */}
        {userData?.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {userData?.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
       
      </div>
      <div className='w-[40%]'>
    <EditProfile/>
    </div>
    </div>
  )
}

export default Profile
