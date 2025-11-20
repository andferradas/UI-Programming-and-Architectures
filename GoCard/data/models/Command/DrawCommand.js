class Draw extends Command {
    constructor(shape, color, start, end) {
        super();
        this.shape = shape;
        this.color = color;
        this.start = start;
        this.end = end;
    }

    execute(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        
        const { x: x1, y: y1 } = this.start;
        const { x: x2, y: y2 } = this.end;

        if (this.shape === 'rectangle') {
        const width = x2 - x1;
        const height = y2 - y1;
        ctx.strokeRect(x1, y1, width, height);
        } else if (this.shape === 'circle') {
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
        ctx.stroke();
        } else if (this.shape === 'line') {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        }

        ctx.restore();
    }
}

window.Draw = Draw;