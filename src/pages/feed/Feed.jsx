import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFeedData } from "../../store/feedSlice";
import axios from "axios";
import FeedCard from "./FeedCard";

const Feed = () => {
  const[loading,setLoading]=useState(false);
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store.feed.feedData);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + "/myFeed", {
        withCredentials: true,
      });
      dispatch(setFeedData(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };
  if (loading) {
  return (
    <div className="flex justify-center items-center mt-40">
      <div className="w-10 h-10 border-4 border-pink-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
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
    <div className="flex justify-center mt-20">
      <FeedCard feed={feedData?.[0]} />
    </div>
  );
};

export default Feed;
