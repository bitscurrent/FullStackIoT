
// import { useEffect } from "react";

// const WebSocketHandler = ({ setLdrValue, setIsLightOn }) => {
//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:5001"); // Connect to WebSocket server

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setLdrValue(data.ldrValue);
//       setIsLightOn(data.isLightOn);
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket Error:", error);
//     };

//     return () => socket.close(); // Cleanup on unmount
//   }, [setLdrValue, setIsLightOn]);

//   return null;
// };

// export default WebSocketHandler;






import { useEffect } from "react";

const WebSocketHandler = ({ setLdrValue, setIsLightOn }) => {
  useEffect(() => {
    let socket;
    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:5001");

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLdrValue(data.ldrValue);
        setIsLightOn(data.isLightOn);
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      socket.onclose = () => {
        console.warn("WebSocket closed, reconnecting...");
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 sec
      };
    };

    connectWebSocket();

    return () => socket?.close(); // Cleanup on unmount
  }, [setLdrValue, setIsLightOn]);

  return null;
};

export default WebSocketHandler;
