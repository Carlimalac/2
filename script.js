const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#40E0D0'; // Default turquoise color
let strokeSize = 3; // Default stroke size
let lastX, lastY;

// Event listeners for drawing on mouse and touch devices
function startDrawing(e) {
  drawing = true;
  lastX = e.offsetX || e.touches[0].offsetX; // Use touch offset if it's a touch event
  lastY = e.offsetY || e.touches[0].offsetY;
}

function draw(e) {
  if (drawing) {
    const currentX = e.offsetX || e.touches[0].offsetX;
    const currentY = e.offsetY || e.touches[0].offsetY;
    drawLine(lastX, lastY, currentX, currentY);
    lastX = currentX;
    lastY = currentY;
  }
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Reset the path
}

// Handle mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Handle touch events
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default touch behavior
  startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent default touch behavior
  draw(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

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
