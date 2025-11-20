async function renderCreateCardView() {
  const app = document.getElementById('app');

  // For doing with Live Server extension:
  // const page = await fetch("presentation/html/create_card.html").then(r => r.text());
  app.innerHTML = `<main class="create-card-container">
    <h1 class="home-title">Create Your Card</h1>
    <p id="currentDraw">Currently drawing: Rectangle</p>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="tool">
        <button id="rectBtn" data-tool="rectangle">Rectangle</button>
        <p class="shortcut">Key: R</p>
      </div>

      <div class="tool">
        <button id="circleBtn" data-tool="circle">Circle</button>
        <p class="shortcut">Key: C</p>
      </div>

      <div class="tool">
        <button id="lineBtn" data-tool="line">Line</button>
        <p class="shortcut">Key: L</p>
      </div>

      <div class="tool">
        <input id="colorPicker" type="color" value="#ff0000" />
        <p id="currentColorText">Current color: #ff0000</p>
      </div>

      <div class="tool">
        <button id="undoBtn" data-action="undo">Undo</button>
        <p class="shortcut">Key: Z</p>
      </div>

      <div class="tool">
        <button id="redoBtn" data-action="redo">Redo</button>
        <p class="shortcut">Key: Y</p>
      </div>

      <div class="tool">
        <button id="clearBtn" data-action="clear">Clear</button>
        <p class="shortcut">Key: X</p>
      </div>
    </div>

    <!-- Canvas -->
    <div id="canvasWrap">
      <canvas id="drawCanvas" width="500" height="650"></canvas>
    </div>

    <!-- Save button -->
    <div class="save-card">
      <button id="saveCardBtn">Save Card</button>
    </div>
  </main>
  `;

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
    switch (e.key?.toLowerCase()) {
      case 'r': currentShape = 'rectangle'; text.textContent = 'Currently drawing: Rectangle'; break;
      case 'c': currentShape = 'circle'; text.textContent = 'Currently drawing: Circle'; break;
      case 'l': currentShape = 'line'; text.textContent = 'Currently drawing: Line'; break;
      case 'z': document.getElementById('undoBtn').click(); break;
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
