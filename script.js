const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#40E0D0'; // Default turquoise color
let strokeSize = 3; // Default stroke size
let lastX, lastY;

// Event listeners for mouse events (desktop)
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    drawLine(lastX, lastY, currentX, currentY);
    lastX = currentX;
    lastY = currentY;
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath(); // Reset the path
});

canvas.addEventListener('mouseout', () => {
  drawing = false;
  ctx.beginPath(); // Reset the path when mouse leaves canvas
});

// Event listeners for touch events (mobile)
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default scrolling
  drawing = true;
  const touch = e.touches[0];
  lastX = touch.clientX - canvas.getBoundingClientRect().left;
  lastY = touch.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent default scrolling
  if (drawing) {
    const touch = e.touches[0];
    const currentX = touch.clientX - canvas.getBoundingClientRect().left;
    const currentY = touch.clientY - canvas.getBoundingClientRect().top;
    drawLine(lastX, lastY, currentX, currentY);
    lastX = currentX;
    lastY = currentY;
  }
});

canvas.addEventListener('touchend', () => {
  drawing = false;
  ctx.beginPath(); // Reset the path when touch ends
});

canvas.addEventListener('touchcancel', () => {
  drawing = false;
  ctx.beginPath(); // Reset the path if touch is canceled
});

// Draw the line
function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeSize;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Change color from color picker
document.getElementById('colorPicker').addEventListener('input', (e) => {
  color = e.target.value;
});

// Change stroke size
document.getElementById('strokeSize').addEventListener('input', (e) => {
  strokeSize = e.target.value;
});

// Download the drawing
document.getElementById('downloadBtn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'drawing.png';
  link.click();
});
