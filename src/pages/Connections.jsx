import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../store/connectionSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

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
   <Spinner/>
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
      <div className='w-full flex flex-col justify-center md:items-center'>
        {connections?.map((connection)=>(
            <div className=' md:w-[50%]  border rounded-xl flex justify-between items-center gap-4 px-3 md:px-6 py-2  mt-4 mx-2 md:mx-0 ' key={connection?._id}>
                <div className='flex gap-4'>
                <img className='w-20 h-20 md:w-28 md:h-28 rounded-[100%]' src={connection?.imageUrl}/>
                
                <div>
               <p className='font-semibold text-[1rem] md:text-[1.5rem] capitalize'><span>{connection?.firstName}</span> <span>{connection?.lastName}</span></p> 
               <p className='text-[0.8rem] md:text-[1rem]'><span>{connection?.age}</span>, <span>{connection?.gender}</span></p> 
               <p className='text-[0.8rem] md:text-[1rem]'>{connection?.about}</p> 
               </div>
               </div>
               <div>
                <button className='border px-4 py-1 rounded-xl bg-pink-500 ' onClick={()=>handleNavigate(connection?._id)}>Chat</button>
               </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Connections
