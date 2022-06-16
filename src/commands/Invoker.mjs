export class Invoker
{
    constructor () {
        this.commands = {}
    }

    setCommand(key,command)
    {
        this.commands[key] = command
    }

    handle(key) {
        this.commands[key].execute()
    }
}