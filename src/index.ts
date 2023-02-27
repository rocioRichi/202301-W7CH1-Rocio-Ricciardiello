import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

server.listen(PORT);

server.on('error', () => {
  // SIn hacer
});

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});
