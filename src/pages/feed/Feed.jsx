import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFeedData } from "../../store/feedSlice";
import axios from "axios";
import FeedCard from "./FeedCard";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const[loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const feedData = useSelector((store) => store.feed.feedData);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + "/myFeed", {
       headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
      });
      dispatch(setFeedData(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
       if(error.response?.status === 401){
         navigate("/login");
      }
    }finally{
      setLoading(false);
    }
  };
  if (loading) {
  return (
   <Spinner/>
  );
}

  if(feedData?.length===0){
    return (
      <>
      <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="font-bold text-[3rem]">OOPS!!</h1>
      <p className="font-semibold text-md">No new Feeds</p>
      </div>
      </>
    )
  }
  return (
    <div className="flex justify-center mt-16 md:mt-20 px-4 md:px-0">
      <FeedCard feed={feedData?.[0]} />
    </div>
  );
};

export default Feed;
