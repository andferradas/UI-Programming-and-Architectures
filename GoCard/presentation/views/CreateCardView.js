/*
import { Draw} from "./../../data/models/Command/DrawCommand.js";
import { Clear } from "./../../data/models/Command/ClearCommand.js";
import { History } from "./../../services/HistoryService.js";

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

const toolButtons = document.querySelectorAll('[data-tool]');
const actionButtons = document.querySelectorAll('[data-action]');

function setActiveTool(toolName) {
  toolButtons.forEach(btn => {
    if (btn.dataset.tool === toolName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  currentTool = toolName;
}

// Mouse click -> set tool
toolButtons.forEach(button => {
  button.addEventListener('click', () => {
    setActiveTool(button.dataset.tool);
  });
});

// Action buttons (undo, redo, clear)
actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.focus();
    setTimeout(() => button.blur(), 200);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  switch (e.key.toLowerCase()) {
    case 'r': // rectangle
      setActiveTool('rectangle');
      break;
    case 'c': // circle
      setActiveTool('circle');
      break;
    case 'l': // line
      setActiveTool('line');
      break;
    case 'u': // undo
      document.getElementById('undoBtn').click();
      break;
    case 'y': // redo
      document.getElementById('redoBtn').click();
      break;
    case 'x': // clear
      document.getElementById('clearBtn').click();
      break;
  }
});
*/