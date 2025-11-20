class Command {
    execute() {
        throw new Error("Execute method should be implemented");
    }
    undo() {
    }
}

window.Command = Command;