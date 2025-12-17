import React from 'react'
import { removeFeed } from '../../store/feedSlice';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';

const FeedCard = ({feed}) => {
    const dispatch=useDispatch();

    const handleReq=async(id,status)=>{
       try{
              const response=await fetch(`${BASE_URL}/request/send/${status}/${id}`,{
                  method:"POST",
                  credentials:"include"
              });
              const jsonData=await response.json();
              //  navigate("/connections");
              dispatch(removeFeed(id));
      
           }catch(error){
              console.log(error);
           }
    }
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={feed?.imageUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{feed?.firstName}<span>{feed?.age}</span></h2>
    <p>{feed?.about}</p>
     <div className='flex gap-2'>
        <button className='border bg-pink-500 px-2 py-1 rounded-xl' onClick={()=>handleReq(feed?._id, "interested")}>interested</button>
        <button className='bg-purple-400 border px-2 py-1 rounded-xl' onClick={()=>handleReq(feed?._id, "ignored")}>Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard
