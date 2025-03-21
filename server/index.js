
// import express from "express";
// import { WebSocketServer } from "ws";
// import cors from "cors";

// const app = express();
// const PORT = 5000;
// const wss = new WebSocketServer({ port: 5001 });

// let isLightOn = false;
// let ldrValue = 0;

// app.use(cors());
// app.use(express.json());

// // Simulate LDR sensor values (Replace this with real Raspberry Pi data)
// setInterval(() => {
//   ldrValue = Math.floor(Math.random() * 1000); // Mock LDR values between 0-1000

//   // Auto turn ON light if too dark (LDR value < 300)
//   isLightOn = ldrValue < 300;

//   wss.clients.forEach((client) => {
//     if (client.readyState === client.OPEN) {
//       client.send(JSON.stringify({ ldrValue, isLightOn }));
//     }
//   });
// }, 2000); // Update every 2 sec

// // API to toggle light manually
// app.post("/toggle-light", (req, res) => {
//   isLightOn = !isLightOn;
//   res.json({ isLightOn });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv()


const app = express();
const PORT = process.env.PORT;
const WS_PORT = process.env.WS_PORT;

const wss = new WebSocketServer({ port: WS_PORT });

let isLightOn = false;
let ldrValue = 0;

app.use(cors());
app.use(express.json());

// Simulate LDR sensor values (Replace this with real Raspberry Pi data)
setInterval(() => {
  ldrValue = Math.floor(Math.random() * 1000); // Mock LDR values between 0-1000

  // Auto turn ON light if too dark (LDR value < 300)
  isLightOn = ldrValue < 300;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ ldrValue, isLightOn }));
    }
  });
}, 2000); // Update every 2 sec

// API to toggle light manually
app.post("/toggle-light", (req, res) => {
  isLightOn = !isLightOn;
  res.json({ isLightOn });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
