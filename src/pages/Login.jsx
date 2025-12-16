import React from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/loginSlice";

const loginSchema=z.object({
   email: z.string().nonempty("Email is required").email("Invalid email format"),
   password: z.string().min(8, "Password must be at least 8 characters"),
})

const Login = () => {
  const dispatch=useDispatch();
const {register,reset,handleSubmit,formState: { errors }}=useForm({
        resolver:zodResolver(loginSchema),
        mode:"onSubmit",
        defaultValues:{
            email:"",
            password:""
        }
    });
    
     const onSubmit=async(data)=>{
      try{
       const response=await fetch("http://localhost:3000/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data),
           credentials:"include"
        }); 
        const jsonResponse=await response.json();
        dispatch(setUserData(jsonResponse.data));
        reset()
      }catch(error){
        console.error(error.message);
      }

     }
  return (
    <div className=" w-full  h-screen border border-red-500">
      <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[30%] border border-gray-700 rounded-xl py-20 pt-10 flex flex-col justify-center items-center p-10 shadow-xl"
      >
        <p className="self-start font-bold text-[2rem] mb-8">Login!</p>
        <p className="self-start mb-1">Email:</p>
        <input
          type="email"  
          placeholder="Enter your email Address"
          className="px-3 py-2 border border-gray-400 w-full rounded-xl bg-gray-300"
          name="email"
          {...register("email")}
        />
        {errors.email && (
            <p className="text-sm self-start mt-0 text-white">{errors.email.message}</p>
        )}
        <p className="self-start mb-1 mt-10">Password:</p>
        <input
          type="password"
          placeholder="Enter password"
          className="px-3 py-2 border border-gray-400 w-full rounded-xl bg-gray-300"
          name="password"
          {...register("password")}
        />
        {errors.password && (
            <p className="text-sm self-start text-white">{errors.password.message}</p>
        )}
        <button type="submit" className=" mt-10  text-white px-4 py-1 rounded-xl border border-gray-700">
          Login
        </button>
         <p className='self-start mt-6 text-s'>Create an account? <Link to ="/signup"><span className='text-blue-600'>Signup</span></Link></p>
      
      </form>
      </div>
    </div>
  );
};

export default Login;
