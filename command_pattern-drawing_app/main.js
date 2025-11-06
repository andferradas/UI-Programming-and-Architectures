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
document.getElementById('colorPicker').onchange = (e) => currentColor = e.target.value;
document.getElementById("undoBtn").onclick = () => history.undo();
document.getElementById("redoBtn").onclick = () => history.redo();
document.getElementById("clearBtn").onclick = () => history.execute(new Clear());

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
  const preview = new Draw(currentShape, currentColor, start, pos);
  preview.execute(ctx);
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
