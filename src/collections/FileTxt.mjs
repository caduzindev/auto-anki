import { createInterface } from 'readline'

export class FileTxt
{
    constructor (file) {
        this.fileReader = createInterface({
            input: file,
            output: process.stdout,
            terminal: false
        })
    }

    getData()
    {
        return this.fileReader
    }
}