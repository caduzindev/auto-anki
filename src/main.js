const { createReadStream } = require('fs')
const { join } = require('path')
const readline = require('readline')
const Queue = require('./structures/queue')

// ^M\s[\s\S]{1,}
function main()
{
    const path = join(__dirname,'..','teste.txt')
    let file = readline.createInterface({
        input: createReadStream(path),
        output: process.stdout,
        terminal: false
    })

    let c = 0
    let limit = 3
    let data = ''
    let queue = new Queue()

    file.on('line', line => {
        if (line === '.' && c !== limit) throw new Error('O Ponto está no lugar errado')

        if (line === '.' && c === limit) {
            queue.enqueue(data)
            c = 0
            data = ''
        } else {
            data+=line+'&'
            c++
        }
    })

    file.on('close',()=>{
        console.log(queue)
    })
}

main()