import { createInterface } from 'readline'

class FileTxt
{
    constructor (stream) {
        this.fileReader = createInterface({
            input: stream,
            output: process.stdout,
            terminal: false
        })
    }

    getData()
    {
        return this.fileReader
    }
}

export default FileTxt