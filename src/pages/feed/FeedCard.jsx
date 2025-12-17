import React from 'react'
import { removeFeed } from '../../store/feedSlice';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedCard = ({feed}) => {
    const dispatch=useDispatch();
     const handleReq=async(id,status)=>{
       try{
              const response=await axios.post(`${BASE_URL}/request/send/${status}/${id}`,
                {},
                {withCredentials:true}
              );
              if(response.data.success){
                   dispatch(removeFeed(id));
                    if(response.data.data.status=="interested"){
                    toast.success("You show Interest in this profile!");
                    }else{
                        toast.error("Profile Ignored!");
                    }
              }
             }catch(error){
             toast.error(error.response.data.message);
           }
    }
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={feed?.imageUrl}
      alt="image" className='mt-4 rounded-lg' />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-2xl font-semibold text-gray-800 capitalize ">{feed?.firstName} {feed?.lastName}
            <span className="text-gray-500">{feed?.age}</span></h2>
             <p className="text-sm text-gray-500 capitalize">
            {feed?.gender}
          </p>
          <div className=" bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-700">{feed?.about}</p>
           {feed?.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {feed?.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        </div>
     <div className='flex gap-2'>
        <button className='border bg-pink-500 px-3 py-2 rounded-xl text-md font-semibold' onClick={()=>handleReq(feed?._id, "interested")}>interested</button>
        <button className='bg-purple-400 border px-3 py-3 rounded-xl text-md font-semibold' onClick={()=>handleReq(feed?._id, "ignored")}>Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard
