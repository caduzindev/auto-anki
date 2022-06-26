export class File
{
    constructor (tagPattern)
    {
        this.tagPattern = tagPattern
    }
    async * extractStructureFromLines(readline)
    {
        let c = 0
        let limit = 3
        let data = {}

        for await (const line of readline.getData()) {
            if (line === '.' && c !== limit) {
                throw new Error('O Ponto está no lugar errado')
            }
            if (line === '.' && c === limit) {
                yield data
                c = 0
                data = {}
            } else {
                let key = this.tagPattern.inTagPattern(line)
                data[key] = this.tagPattern.replaceTagPattern(key,line)
                c++
            }

        }
    }
}