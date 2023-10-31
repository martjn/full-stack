import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="p-4 w-1/2 shadow-lg my-5 cursor-pointer hover:border-purple-900 hover:border-opacity-100 hover:border-2 rounded-lg" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="my-2 p-2 font-bold bg-gray-800 text-blue-gray-200 rounded">
              {value.title}
            </div>
            <div className="border-2 border-violet-600 rounded p-2">
              {value.postText}
            </div>
            <div className="text-sm">{`@${value.username}`}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
