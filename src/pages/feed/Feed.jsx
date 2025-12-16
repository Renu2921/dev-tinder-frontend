import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFeedData } from "../../store/feedSlice";
import axios from "axios";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store.feed.feedData);
  console.log(feedData);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/myFeed", {
        withCredentials: true,
      });
      dispatch(setFeedData(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Feed mounted");
  return (
    <div className="flex justify-center mt-40">
      <FeedCard feed={feedData?.[0]} />
    </div>
  );
};

export default Feed;
