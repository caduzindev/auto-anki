import { Readable } from 'stream'

export class File
{
    constructor (tagPattern)
    {
        this.tagPattern = tagPattern
    }
    extractStructureFromLines(readline)
    {
        let readable = new Readable({
            async read(){
                let c = 0
                let limit = 3
                let data = {}

                for await (const line of readline.getData()) {
                    if (line === '.' && c !== limit) {
                        this.push(null)
                        throw new Error('O Ponto está no lugar errado')
                    }
                    if (line === '.' && c === limit) {
                        this.push(JSON.stringify(data))
                        c = 0
                        data = {}
                    } else {
                        let key = this.fileModel.tagPattern.inTagPattern(line)
                        console.log(this.fileModel.tagPattern.replaceTagPattern(key,line))
                        data[key] = this.fileModel.tagPattern.replaceTagPattern(key,line)
                        c++
                    }
                }
            }

        })

        readable.fileModel = this

        return readable
    }
}