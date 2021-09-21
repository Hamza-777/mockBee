// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";

export default function App() {
  let [token, setToken] = useState();
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([])
  const [history, setHistory] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/videos")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      setVideos(data.videos);
    });
  }, []);

  // signup API call
  const signupHandler = () => {
    fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.encodedToken);
        setToken(data.encodedToken);
      });
  };

  // signup API call
  const loginHandler = () => {
    fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "dhruvishah@gmail.com", password: "dhruviShah123" }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.encodedToken);
        setToken(data.encodedToken);
      });
  };

  useEffect(() => {
    if (token) {
      fetchLikedVideoDetails();
      fetchHistory();
    }
  }, [token, encodedToken]);

  const fetchLikedVideoDetails = () => {
    fetch("/api/user/likes", {
      headers: {
        authorization: encodedToken,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLikedVideos(data.likes);
      });
  };

  const fetchHistory = () => {
    fetch("/api/user/history", {
      headers: {
        authorization: encodedToken,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setHistory(data.history);
      });
  };

  // Like Handlers
  const addToLikedVideos = (video) => {
    // Call post api
    fetch("api/user/likes", {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
      // Stringify data and send it
      body: JSON.stringify({ video }),
    })
      .then((data) => data.json())
      .then((data) => setLikedVideos(data.likes))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const removeFromLikedVideos = (video) => {
    // Call post api
    fetch("api/user/likes", {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
      // Stringify data and send it
      body: JSON.stringify({ video }),
    })
      .then((data) => data.json())
      .then((data) => setLikedVideos(data.likes))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // History Handlers
  const addToHistory = (video) => {
    // Call post api
    fetch("api/user/history", {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
      // Stringify data and send it
      body: JSON.stringify({ video }),
    })
      .then((data) => data.json())
      .then((data) => setHistory(data.history))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const removeFromHistory = (video) => {
    // Call post api
    fetch("api/user/history", {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
      // Stringify data and send it
      body: JSON.stringify({ video }),
    })
      .then((data) => data.json())
      .then((data) => setHistory(data.history))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const clearHistory = (video) => {
    // Call post api
    fetch("api/user/history/all", {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
      // Stringify data and send it
      body: JSON.stringify({ video }),
    })
      .then((data) => data.json())
      .then((data) => setHistory(data.history))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <h2>Available Products</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Like</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video, index) => {
            return (
              <tr key={index}>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td><td>
                  <button onClick={() => addToLikedVideos(video)}> 🚀 </button>
                  <button onClick={() => removeFromLikedVideos(video)}> 🕯 </button>
                  <button onClick={() => addToHistory(video)}> 🤩 </button>
                </td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <div>
        <h1>Liked Videos</h1>
        <ul>
          {likedVideos.map((video) => (
            <div>
              {" "}
              <li>
                {video.title}{" "}

              </li>{" "}
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h1>History Videos <button onClick={() => clearHistory()}>Clear</button></h1>
        <ul>
          {history.map((video) => (
            <div>
              {" "}
              <li>
                {video.title}{" "}
                <button onClick={() => removeFromHistory(video)}>Remove</button>
              </li>{" "}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
