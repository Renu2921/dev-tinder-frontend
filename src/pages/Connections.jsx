import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../store/connectionSlice';

const Connections = () => {
const dispatch=useDispatch();
const connections=useSelector((store)=>store.connection.connections);
console.log(connections);
    useEffect(()=>{
     connectionData();
    },[]);

    const connectionData=async()=>{
        try{
           const response=await fetch(BASE_URL+"/request/myMatches",{
            Method:"GET",
            credentials:"include"
           })
           const jsonData=await response.json();
            dispatch(setConnections(jsonData.data))
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className=''>
      <p className='text-center font-bold text-[2rem] m-10'>Your Connections!!</p>
      <div className='flex flex-col justify-center items-center'>
        {connections?.map((connection)=>(
            <div className='w-[40%] border rounded-xl flex  items-center gap-2 px-6 py-2  mt-4 ' key={connection?._id}>
                <div>
                <img className='w-20 h-20 rounded-[100%]' src={connection?.imageUrl}/>
                </div>
                <div>
               <p><span>{connection?.firstName}</span><span>{connection?.lastName}</span></p> 
               <p><span>{connection?.age}</span>, <span>{connection?.gender}</span></p> 
               <p>{connection?.about}</p> 
               </div>
               
            </div>
        ))}
      </div>
    </div>
  )
}

export default Connections
