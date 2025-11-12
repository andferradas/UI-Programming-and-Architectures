export class History {
    constructor(ctx) {
        this.ctx = ctx;
        this.history = [];
        this.redoStack = [];
    }

    execute(command) {
        this.history.push(command);
        this.redoStack = [];
        this.renderAll();
    }

    undo() {
        if (this.history.length === 0) return;
        const command = this.history.pop();
        this.redoStack.push(command);
        this.renderAll();
    }

    redo() {
        if (this.redoStack.length === 0) return;
        const command = this.redoStack.pop();
        this.history.push(command);
        this.renderAll();
    }

    renderAll() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (const command of this.history) {
            command.execute(this.ctx);
        }
    }
}
