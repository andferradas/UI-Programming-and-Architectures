import { Draw } from "./classDraw.js";
import { Clear } from "./classClear.js";
import { History } from "./classHistory.js";

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const history = new History(ctx);

let currentShape = 'rectangle';
let currentColor = '#ff0000';
let drawing = false;
let start = null;

document.getElementById('rectBtn').onclick = () => currentShape = 'rectangle';
document.getElementById('circleBtn').onclick = () => currentShape = 'circle';
document.getElementById('lineBtn').onclick = () => currentShape = 'line';
document.getElementById("undoBtn").onclick = () => history.undo();
document.getElementById("redoBtn").onclick = () => history.redo();
document.getElementById("clearBtn").onclick = () => history.execute(new Clear());
const colorText = document.getElementById('currentColorText');
document.getElementById('colorPicker').addEventListener('input', e => {
  currentColor = e.target.value;
  colorText.textContent = `Current color: ${currentColor}`;
});

function getMousePosition(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

canvas.addEventListener("mousedown", e => {
  drawing = true;
  start = getMousePosition(e);
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;
  const pos = getMousePosition(e);
  history.renderAll();

  // Use dashed light gray line for preview
  ctx.save();
  ctx.setLineDash([6, 6]);             // dashed pattern: 6px line, 6px gap
  ctx.strokeStyle = '#595858f4';     // light gray color
  ctx.lineWidth = 2;

  const preview = new Draw(currentShape, '#aaa', start, pos);
  preview.execute(ctx);

  ctx.restore();
});


canvas.addEventListener("mouseup", e => {
  if (!drawing) return;
  drawing = false;
  const end = getMousePosition(e);
  const command = new Draw(currentShape, currentColor, start, end);
  history.execute(command);
});

// Update phrase based on selected shape
const text = document.getElementById('currentDraw');

document.getElementById('rectBtn').addEventListener('click', () => {
  text.textContent = 'Currently drawing: Rectangle';
});

document.getElementById('circleBtn').addEventListener('click', () => {
  text.textContent = 'Currently drawing: Circle';
});

document.getElementById('lineBtn').addEventListener('click', () => {
  text.textContent = 'Currently drawing: Line';
});

document.addEventListener('keydown', (e) => {
  switch(e.key.toLowerCase()) {
    case 'r':
      currentShape = 'rectangle';
      text.textContent = 'Currently drawing: Rectangle';
      break;
    case 'c':
      currentShape = 'circle';
      text.textContent = 'Currently drawing: Circle';
      break;
    case 'l':
      currentShape = 'line';
      text.textContent = 'Currently drawing: Line';
      break;
    case 'z':
      history.undo();
      break;
    case 'y':
      history.redo();
      break;
    case 'x':
      history.execute(new Clear());
      break;
  }
});

