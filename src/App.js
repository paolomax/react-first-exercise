import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkIfAtBottomPage);
    setFetch(true);
  }, []);

  useEffect(() => {
    if (fetch) {
      fetchNextChunk();
    }
  }, [fetch]);

  useEffect(() => {
    if (!fetch) checkIfThereIsMoreSpace();
  }, [posts]);

  const fetchNextChunk = async () => {
    try {
      setStart(start + limit);
      const response = await axios.get(
        `http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
      );

      setPosts([...posts, ...response.data]);
      setFetch(false);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfThereIsMoreSpace = () => {
    if (document.documentElement.offsetHeight < window.innerHeight + 100) {
      setFetch(true);
    }
  };

  const checkIfAtBottomPage = () => {
    if (fetch) return true;

    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.offsetHeight - 10;

    if (bottomOfWindow) {
      setFetch(true);
    }
  };

  return (
    <div className="App text-center">
      <h1 className="my-3">My Posts</h1>
      {posts.map((post, index) => (
        <Post key={index} post={post} start={start} />
      ))}
    </div>
  );
}

export default App;
