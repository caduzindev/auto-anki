import { Readable } from 'stream'

export class File
{
    constructor(){}

    extractStructureFromLines(readline)
    {
        let readable = new Readable({
            async read(){
                let c = 0
                let limit = 3
                let data = ''

                for await (const line of readline.getData()) {
                    if (line === '.' && c !== limit) {
                        this.push(null)
                        throw new Error('O Ponto está no lugar errado')
                    }
                    if (line === '.' && c === limit) {
                        this.push(data)
                        c = 0
                        data = ''
                    } else {
                        data = data.concat(line,'&')
                        c++
                    }
                }
            }

        })

        return readable
    }
}