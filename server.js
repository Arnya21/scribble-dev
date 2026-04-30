require('dotenv').config(); // Environment variables ko load karne ke liye
const express = require('express');
const path = require('path'); // Path module folders handle karne ke liye zaroori hai
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Static files (HTML, CSS, JS) ko serve karne ka foolproof tareeka
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected to Scribble-Dev 🚀');

    // Handling whiteboard data
    socket.on('draw-data', (data) => {
        socket.broadcast.emit('draw-data', data);
    });

    socket.on('stop-pencil', () => {
        socket.broadcast.emit('stop-pencil');
    });

    // Handling global chat
    socket.on('cloud-chat', (data) => {
        // broadcast.emit use karne se sender ko khud ka message wapas nahi milega
        socket.broadcast.emit('cloud-chat', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Port settings jo .env file se connect hongi
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Scribble-Dev is LIVE at http://localhost:${PORT}`);
    console.log(`🌍 AWS Readiness: Security Group should allow Port ${PORT}`);
});