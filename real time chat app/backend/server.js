const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: '*',
methods: ['GET', 'POST']
}
});
// Serve test endpoint
app.get('/', (req, res) => {
res.send('Realtime Chat Backend is Running 🚀');
});
// Socket.io logic
io.on('connection', (socket) => {
console.log('A user connected:', socket.id);
// Receive and broadcast messages
socket.on('chatMessage', (msg) => {
io.emit('chatMessage', msg);
});
socket.on('disconnect', () => {
console.log('User disconnected:', socket.id);
});
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
console.log(`✅ Server running on port ${PORT}`);
});