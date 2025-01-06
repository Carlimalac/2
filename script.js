const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#40E0D0'; // Default turquoise color
let strokeSize = 3; // Default stroke size
let lastX, lastY;

// Function to get correct mouse or touch position relative to the canvas
function getPosition(e) {
  const rect = canvas.getBoundingClientRect(); // Get the position of the canvas in the viewport
  const x = (e.clientX || e.touches[0].clientX) - rect.left; // Adjust for the canvas offset
  const y = (e.clientY || e.touches[0].clientY) - rect.top;
  return { x, y };
}

// Start drawing
function startDrawing(e) {
  drawing = true;
  const { x, y } = getPosition(e);
  lastX = x;
  lastY = y;
}

// Draw on the canvas
function draw(e) {
  if (drawing) {
    const { x, y } = getPosition(e);
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
}

// Stop drawing
function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Reset the path
}

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events (for mobile devices)
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default touch behavior like zooming
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
