import React, { useEffect, useState } from 'react';
import socket from './socket';
function App() {
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);
useEffect(() => {
socket.on('chat message', (msg) => {
setMessages((prev) => [...prev, msg]);
});
return () => {
socket.off('chat message');
};
}, []);
const sendMessage = (e) => {
e.preventDefault();
if (message.trim()) {
socket.emit('chat message', message);
setMessage('');
}
};
return (
<div style={{ padding: '2rem' }}>
<h2>Realtime Chat</h2>
<ul>
{messages.map((msg, idx) => (
<li key={idx}>{msg}</li>
))}
</ul>
<form onSubmit={sendMessage}>
<input
type="text"
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Type a message..."
/>
<button type="submit">Send</button>
</form>
</div>
);
}
export default App;