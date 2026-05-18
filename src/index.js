import express from 'express';
import { connectDB } from './db/init.js';
import http from 'http';
import {WebSocketServer} from 'ws';
import dotenv from 'dotenv';
import getCheckbox from './controllers/getCheckbox.js';
import updateCheckbox from './controllers/updateCheckbox.js';
import seed from '../utils/seedMongo.js';
import cors from 'cors';




dotenv.config();

const app = express();
app.use(cors());

await connectDB();
await seed();
app.use(express.json());

app.get('/checkboxes', getCheckbox);

const server = http.createServer(app);



const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('New client connected');


  socket.on('message', (message) => {
    const data = JSON.parse(message);
    const { uniqueId, checked } = data;
    // Update DB, then broadcast the updated checkbox object to other clients
    updateCheckbox(uniqueId, checked)
      .then((updatedCheckbox) => {
        console.log(`Checkbox with uniqueId ${uniqueId} updated to ${checked}`);
        // Broadcast the updated checkbox to all other connected clients
        wss.clients.forEach((client) => {
          if (client !== socket && client.readyState === 1) {
            client.send(JSON.stringify(updatedCheckbox));
          }
        });
      })
      .catch((error) => {
        console.error('Error updating checkbox:', error);
      });
    console.log(`Received message: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});