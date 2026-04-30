// Student-style Logic for Scribble Cloud
const socket = io();
const board = document.getElementById('board');
const ctx = board.getContext('2d');
const msgBox = document.getElementById('messages_box');

// Prompt for username for the session
let myName = prompt("Enter your Cloud-Dev name:") || "Arnya";
document.getElementById('display_name').innerText = `Player: ${myName}`;

// Drawing state variables
let isDrawing = false;
let brushColor = '#a29bfe';
let brushSize = 10;
let brushStyle = 'pencil'; // Options: pencil, magic, eraser

// Initialize Canvas Size to fit the frame
function resizeCanvas() {
    board.width = board.parentElement.clientWidth;
    board.height = board.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing Function
function startDrawingAction(x, y, color, size, style) {
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    
    if (style === 'eraser') {
        ctx.strokeStyle = '#FFFFFF'; // White to simulate erasing
        ctx.shadowBlur = 0;
    } else {
        ctx.strokeStyle = color;
        // Neon/Magic glow effect
        ctx.shadowBlur = (style === 'magic') ? 20 : 0;
        ctx.shadowColor = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse Events for drawing
board.addEventListener('mousedown', (e) => { isDrawing = true; sendDrawData(e); });
board.addEventListener('mousemove', (e) => { if (isDrawing) sendDrawData(e); });
window.addEventListener('mouseup', () => { 
    isDrawing = false; 
    ctx.beginPath(); 
    socket.emit('stop-pencil'); // Notify server that pencil is lifted
});

function sendDrawData(e) {
    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw locally
    startDrawingAction(x, y, brushColor, brushSize, brushStyle);
    // Broadcast data to Cloud server
    socket.emit('draw-data', { x, y, c: brushColor, s: brushSize, t: brushStyle });
}

// Real-time Listeners
socket.on('draw-data', (d) => startDrawingAction(d.x, d.y, d.c, d.s, d.t));
socket.on('stop-pencil', () => ctx.beginPath());

// Color Picker Update
document.getElementById('rang_box').addEventListener('input', (e) => {
    brushColor = e.target.value;
    if (brushStyle === 'eraser') brushStyle = 'pencil'; // Switch back to pen if user picks a color
});

// Size Slider Update
document.getElementById('size_slider').oninput = (e) => {
    brushSize = e.target.value;
    document.getElementById('size_label').innerText = brushSize + "%";
};

// Tool Selection Logic
document.getElementById('pencil_btn').onclick = () => { brushStyle = 'pencil'; updateUI('pencil_btn'); };
document.getElementById('magic_btn').onclick = () => { brushStyle = 'magic'; updateUI('magic_btn'); };
document.getElementById('eraser_btn').onclick = () => { brushStyle = 'eraser'; updateUI('eraser_btn'); };

function updateUI(id) {
    document.querySelectorAll('.lg\\:flex-col button').forEach(btn => btn.classList.replace('bg-accent', 'bg-gray-800'));
    document.getElementById(id).classList.replace('bg-gray-800', 'bg-accent');
}

// Global Chat Logic
function messageBhejo() {
    const input = document.getElementById('inp_msg');
    if (!input.value.trim()) return;
    
    const msg = { user: myName, text: input.value };
    socket.emit('cloud-chat', msg);
    renderMessage(`Me: ${input.value}`, 'me');
    input.value = '';
}

socket.on('cloud-chat', (data) => renderMessage(`${data.user}: ${data.text}`, 'others'));

function renderMessage(txt, type) {
    const div = document.createElement('div');
    div.className = `p-2 rounded-lg text-sm max-w-[85%] ${type === 'me' ? 'bg-accent self-end' : 'bg-gray-800 self-start'}`;
    div.innerText = txt;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight; // Auto-scroll chat
}