const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#40E0D0'; // Default turquoise color
let strokeSize = 3; // Default stroke size
let lastX, lastY;

// Event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
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
