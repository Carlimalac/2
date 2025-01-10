const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#40E0D0'; 
let strokeSize = 3; 
let lastX, lastY;


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
  ctx.beginPath(); 
});

canvas.addEventListener('mouseout', () => {
  drawing = false;
  ctx.beginPath(); 
});


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


document.getElementById('colorPicker').addEventListener('input', (e) => {
  color = e.target.value;
});


document.getElementById('strokeSize').addEventListener('input', (e) => {
  strokeSize = e.target.value;
});


document.getElementById('downloadBtn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'drawing.png';
  link.click();
});
