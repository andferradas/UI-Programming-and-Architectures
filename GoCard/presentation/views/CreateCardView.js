import { Draw } from "/data/models/Command/DrawCommand.js";
import { Clear } from "/data/models/Command/ClearCommand.js";
import { History } from "/services/HistoryService.js";

export async function renderCreateCardView() {
  const app = document.getElementById('app');

  const page = await fetch("/presentation/html/create_card.html").then(r => r.text());
  app.innerHTML = page;

  const canvas = document.getElementById('drawCanvas');
  const ctx = canvas.getContext('2d');
  const history = new History(ctx);

  let currentShape = 'rectangle';
  let currentColor = '#ff0000';
  let drawing = false;
  let start = null;

  const text = document.getElementById('currentDraw');
  const colorText = document.getElementById('currentColorText');

  document.getElementById('rectBtn').onclick = () => { currentShape = 'rectangle'; text.textContent = 'Currently drawing: Rectangle'; };
  document.getElementById('circleBtn').onclick = () => { currentShape = 'circle'; text.textContent = 'Currently drawing: Circle'; };
  document.getElementById('lineBtn').onclick = () => { currentShape = 'line'; text.textContent = 'Currently drawing: Line'; };

  document.getElementById("undoBtn").onclick = () => history.undo();
  document.getElementById("redoBtn").onclick = () => history.redo();
  document.getElementById("clearBtn").onclick = () => history.execute(new Clear());

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

  canvas.addEventListener("mousedown", e => { drawing = true; start = getMousePosition(e); });
  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;
    const pos = getMousePosition(e);
    history.renderAll();

    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#595858f4';
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

  document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
      case 'r': currentShape = 'rectangle'; text.textContent = 'Currently drawing: Rectangle'; break;
      case 'c': currentShape = 'circle'; text.textContent = 'Currently drawing: Circle'; break;
      case 'l': currentShape = 'line'; text.textContent = 'Currently drawing: Line'; break;
      case 'u': document.getElementById('undoBtn').click(); break;
      case 'y': document.getElementById('redoBtn').click(); break;
      case 'x': document.getElementById('clearBtn').click(); break;
    }
  });

  const saveBtn = document.getElementById('saveCardBtn');

  saveBtn.addEventListener('click', () => {
    alert("Card saved!");

    history.execute(new Clear());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

}
