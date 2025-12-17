import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeReq, setRequests } from '../store/requestsSlice';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const requestData=useSelector((store)=>store.request.requests);
console.log(requestData);

    useEffect(()=>{
     connectionData();
    },[]);

    const connectionData=async()=>{
        try{
           const response=await fetch(BASE_URL+"/request/received",{
            method:"GET",
            credentials:"include"
           })
           const jsonData=await response.json();
           console.log(jsonData);
           dispatch(setRequests(jsonData.data));
        }catch(error){
            console.log(error);
        }
    }

    const handleReq=async(id,status)=>{
     try{
        const response=await fetch(`${BASE_URL}/request/review/${status}/${id}`,{
            method:"POST",
            credentials:"include"
        });
        const jsonData=await response.json();
        //  navigate("/connections");
        dispatch(removeReq(id));

     }catch(error){
        console.log(error);
     }
    }
  return (
   <div className=''>
      <p className='text-center font-bold text-[2rem] m-10'>Your Requests!!</p>
      <div className='flex flex-col justify-center items-center'>
        {requestData?.map((req)=>(
            <div className='w-[40%] border rounded-xl flex  items-center justify-between gap-2 px-6 py-2  mt-4 ' key={req?._id}>
               <div className='flex items-center gap-3'>
                <img className='w-20 h-20 rounded-[100%]' src={req?.fromUserId?.imageUrl}/>
                <div>
               <p className='font-semibold text-[1.5rem]'><span>{req?.fromUserId?.firstName}</span> <span>{req?.fromUserId?.lastName}</span></p> 
               <p><span>{req?.fromUserId?.age}</span>, <span>{req?.fromUserId?.gender}</span></p> 
               <p>{req?.about}</p> 
               </div>
               </div>
               <div className='flex gap-2'>
               <button className='border bg-pink-500 px-2 py-1 rounded-xl' onClick={()=>handleReq(req?._id, "accepted")}>Accept</button>
               <button className='bg-purple-400 border px-2 py-1 rounded-xl' onClick={()=>handleReq(req?._id, "rejected")}>Reject</button>
            </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Requests
