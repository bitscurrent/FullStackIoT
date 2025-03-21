
import React, { useState } from "react";
import LightStatus from "./components/LightStatus";
import LdrValue from "./components/LdrValue";
import ControlButton from "./components/ControlButton";
import WebSocketHandler from "./components/WebSocketHandler";

const App = () => {
  const [ldrValue, setLdrValue] = useState(0);
  const [isLightOn, setIsLightOn] = useState(false);

  const toggleLight = () => {
    fetch("http://localhost:5000/toggle-light", { method: "POST" })
      .then(response => response.json())
      .then(data => setIsLightOn(data.isLightOn));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Automatic Light Control System</h1>
      <LdrValue ldrValue={ldrValue} />
      <LightStatus isLightOn={isLightOn} />
      <ControlButton toggleLight={toggleLight} />
      <WebSocketHandler setLdrValue={setLdrValue} setIsLightOn={setIsLightOn} />
    </div>
  );
};

export default App;
