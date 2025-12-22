import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeReq, setRequests } from '../store/requestsSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Requests = () => {
    const [loading,setLoading]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const requestData=useSelector((store)=>store.request.requests);

    useEffect(()=>{
     connectionData();
    },[]);

    const connectionData=async()=>{
        try{
            setLoading(true);
           const response=await fetch(BASE_URL+"/request/received",{
            method:"GET",
            credentials:"include"
           })
           const jsonData=await response.json();
           dispatch(setRequests(jsonData.data));
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    
    const handleReq=async(id,status)=>{
     try{
        const response=await axios.post(`${BASE_URL}/request/review/${status}/${id}`,{},
             {withCredentials:true}
        );
        if(response.data.success){
            dispatch(removeReq(id));
            if(response.data.data.status=="accepted"){
                toast.success("Request Accepted!");
            }else{
                toast.error("Request Rejected!");
            }
        }
        }catch(error){
        toast.error(error.response.data.message);
     }
    }
if (loading) {
  return (
    <div className="flex justify-center items-center mt-40">
      <div className="w-10 h-10 border-4 border-pink-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
    if(requestData?.length===0){
        return (
            <>
            <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="font-bold text-[3rem]">OOPS!!</h1>
      <p className="font-semibold text-md">No new Requests</p>
      </div>
            </>
        )
    }
  return (
   <div className=''>
      <p className='text-center font-bold text-[2rem] m-10'>Your Requests!!</p>
      <div className='w-full flex flex-col justify-center md:items-center'>
        {requestData?.map((req)=>(
            <div className=' md:w-[50%]  border rounded-xl flex justify-between items-center gap-4 px-3 md:px-6 py-2  mt-4 mx-2 md:mx-0' key={req?._id}>
               <div className='flex items-center gap-3'>
                <img className='w-20 h-20 md:w-28 md:h-28 rounded-[100%]' src={req?.fromUserId?.imageUrl}/>
                <div>
               <p className='font-semibold text-[1rem] md:text-[1.5rem] capitalize'><span>{req?.fromUserId?.firstName}</span> <span>{req?.fromUserId?.lastName}</span></p> 
               <p className='text-[0.8rem] md:text-[1rem]'><span>{req?.fromUserId?.age}</span>, <span>{req?.fromUserId?.gender}</span></p> 
               <p className='text-[0.8rem] md:text-[1rem]'>{req?.about}</p> 
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
