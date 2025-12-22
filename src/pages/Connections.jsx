import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../store/connectionSlice';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
const dispatch=useDispatch();
const connections=useSelector((store)=>store.connection.connections);
    useEffect(()=>{
     connectionData();
    },[]);

    const connectionData=async()=>{
        try{
          setLoading(true);
           const response=await fetch(BASE_URL+"/request/myMatches",{
            Method:"GET",
            credentials:"include"
           })
           const jsonData=await response.json();
            dispatch(setConnections(jsonData.data))
        }catch(error){
            console.log(error);
        }finally{
          setLoading(false);
        }
    }
    const handleNavigate=(id)=>{
       navigate(`/chat/${id}`)
    }
    if (loading) {
  return (
    <div className="flex justify-center items-center mt-40">
      <div className="w-10 h-10 border-4 border-pink-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

if(connections?.length===0){
        return (
            <>
            <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="font-bold text-[3rem]">OOPS!!</h1>
      <p className="font-semibold text-md">No Connection Found</p>
      </div>
            </>
        )
    }
  return (
    <div className=''>
      <p className='text-center font-bold text-[2rem] m-10'>Your Connections!!</p>
      <div className='flex flex-col justify-center items-center'>
        {connections?.map((connection)=>(
            <div className='w-[50%] border rounded-xl flex justify-between items-center gap-4 px-6 py-2  mt-4 ' key={connection?._id}>
                <div className='flex gap-4'>
                <img className='w-28 h-28 rounded-[100%]' src={connection?.imageUrl}/>
                
                <div>
               <p className='font-semibold text-[1.5rem]'><span>{connection?.firstName}</span><span>{connection?.lastName}</span></p> 
               <p><span>{connection?.age}</span>, <span>{connection?.gender}</span></p> 
               <p>{connection?.about}</p> 
               </div>
               </div>
               <div>
                <button className='border px-4 py-1 rounded-xl ' onClick={()=>handleNavigate(connection?._id)}>Chat</button>
               </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Connections
