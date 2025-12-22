import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../store/loginSlice";
import { BASE_URL } from "../../utils/constants";
import {z} from "zod";
import FeedCard from "../feed/FeedCard";
import axios from "axios";
import { toast } from "react-toastify";
const editProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  imageUrl: z.string().url("Invalid photo URL"),
  age: z.coerce.number().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  about: z.string().min(1, "About is required"),
  skills: z
  .string()
  .min(1, "Skills are required")
  .transform((val) =>
    val.split(",").map((s) => s.trim()).filter(Boolean)
  ),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 const userData = useSelector((store) => store.login.userData);


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        age: userData.age,
        gender: userData.gender,
        about: userData.about,
         skills: userData.skills?.join(", "),
      });
    }
  }, [userData, reset]);

const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}/profile/edit`,
        data,
        {withCredentials:true});
      dispatch(setUserData(response.data.data));
      if(response.data.success){
        toast.success("Profile Updated sucessfully!");
         navigate("/");
      }
     
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  if (!userData) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="w-full flex justify-center items-start mt-10 md:mt-20 gap-20 min-h-screen">
     <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-[100%] rounded-xl p-4 md:p-10 shadow-xl border"
>
  <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

  <div className="mb-4">
    <label className="block mb-1">First Name</label>
    <input
      type="text"
      {...register("firstName")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.firstName && (
      <p className="text-sm text-white">{errors.firstName.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block mb-1">Last Name</label>
    <input
      type="text"
      {...register("lastName")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.lastName && (
      <p className="text-sm text-white">{errors.lastName.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block mb-1">Photo URL</label>
    <input
      type="text"
      {...register("imageUrl")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.imageUrl && (
      <p className="text-sm text-white">{errors.imageUrl.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block mb-1">Age</label>
    <input
      type="number"
      {...register("age", { valueAsNumber: true })}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.age && (
      <p className="text-sm text-white">{errors.age.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block mb-1">Gender</label>
    <input
      type="text"
      {...register("gender")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.gender && (
      <p className="text-sm text-white">{errors.gender.message}</p>
    )}
  </div>
  <div className="mb-6">
    <label className="block mb-1">About</label>
    <textarea
      {...register("about")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.about && (
      <p className="text-sm text-white">{errors.about.message}</p>
    )}
  </div>

  <div className="mb-6">
    <label className="block mb-1">Skills</label>
    <textarea
      {...register("skills")}
      className="w-full px-3 py-2 rounded bg-gray-300"
    />
    {errors.skills && (
      <p className="text-sm text-white">{errors.skills.message}</p>
    )}
  </div>

  <button
    type="submit"
    className="w-full py-2 bg-red-500 text-white rounded"
  >
    Save Profile
  </button>
</form>
    </div>
  );
};

export default EditProfile;
