import { io } from 'socket.io-client';
const socket = io('https://ibm-nj-realtime-chat-application-backend.onrender.com');
export default socket;