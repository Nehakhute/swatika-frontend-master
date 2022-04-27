import { io } from "socket.io-client";
import { useState, useEffect } from 'react';
import { API_URL } from "../config";
import { useDispatch } from "react-redux";

function useSocket(channel, callbank) {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

  useEffect(() => {
    const auth_token = localStorage.getItem("authToken");
    if (auth_token) {
        let socket = io(API_URL, {
            transports: ["websocket"],
            reconnectionAttempts: 5,
            withCredentials: true,
            query: `token=${auth_token}`,
        });
        setSocket(socket);
    }
  }, [ ]);

    socket?.on(channel, (new_data) => {
      callbank(new_data);
    });

  return true;
}

export default useSocket;