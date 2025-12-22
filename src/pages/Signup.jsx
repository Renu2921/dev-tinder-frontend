import React from "react";
import { useForm } from "react-hook-form";
import {success, z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/loginSlice";
import {BASE_URL} from "../utils/constants"
import axios from "axios";
import { toast } from "react-toastify";

const signupSchema=z.object({
  firstName:z.string().nonempty("firstName is required"),
  lastName:z.string().nonempty("lastName is required"),
   email: z.string().nonempty("Email is required").email("Invalid email format"),
   password: z.string().min(8, "Password must be at least 8 characters"),
})

const Signup = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
const {register,reset,handleSubmit,formState: { errors }}=useForm({
        resolver:zodResolver(signupSchema),
        mode:"onSubmit",
        defaultValues:{
          firstName:"",
          lastName:"",
            email:"",
            password:""
        }
    });
    
     const onSubmit=async(data)=>{
      try{
       const response=await axios.post(BASE_URL+"/signup",
          data,
         {withCredentials:true}
        ); 
        dispatch(setUserData(response.data.data));
        reset();
        if(response.data.success){
           navigate("/profile");
           toast.success("Signup Successfully!")
        }
        
      }catch(error){
        toast.error(error.response.data.message);
      }

     }
  return (
     <div className="w-full flex justify-center items-center px-4 mt-10 md:mt-20">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] border border-gray-700 rounded-xl py-10 px-6 md:px-10 shadow-xl"
  >
    <p className="font-bold text-3xl mb-6">Signup!</p>
    <label className="font-medium">First Name:</label>
    <input
      {...register("firstName")}
      className="w-full px-3 py-2 border border-gray-400 rounded-xl bg-gray-200 mt-1"
      placeholder="Enter your First Name"
    />
    {errors.firstName && (
      <p className="text-red-500 text-sm mt-1">
        {errors.firstName.message}
      </p>
    )}
    <label className="font-medium mt-4 block">Last Name:</label>
    <input
      {...register("lastName")}
      className="w-full px-3 py-2 border border-gray-400 rounded-xl bg-gray-200 mt-1"
      placeholder="Enter your Last Name"
    />
    {errors.lastName && (
      <p className="text-red-500 text-sm mt-1">
        {errors.lastName.message}
      </p>
    )}

    <label className="font-medium mt-4 block">Email:</label>
    <input
      type="email"
      {...register("email")}
      className="w-full px-3 py-2 border border-gray-400 rounded-xl bg-gray-200 mt-1"
      placeholder="Enter your Email"
    />
    {errors.email && (
      <p className="text-red-500 text-sm mt-1">
        {errors.email.message}
      </p>
    )}
    <label className="font-medium mt-4 block">Password:</label>
    <input
      type="password"
      {...register("password")}
      className="w-full px-3 py-2 border border-gray-400 rounded-xl bg-gray-200 mt-1"
      placeholder="Enter Password"
    />
    {errors.password && (
      <p className="text-red-500 text-sm mt-1">
        {errors.password.message}
      </p>
    )}
    <button
      type="submit"
      className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl transition"
    >
      Signup
    </button>

    <p className="mt-4 text-sm">
      Already have an account?{" "}
      <Link to="/login">
        <span className="text-blue-600 font-medium">Login</span>
      </Link>
    </p>
  </form>
</div>

  );
};

export default Signup;
