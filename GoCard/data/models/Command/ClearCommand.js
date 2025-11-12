import { Command } from "./classCommand.js";

export class Clear extends Command {
    execute(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}