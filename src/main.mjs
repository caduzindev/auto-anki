import { argv } from 'node:process'
import { Invoker } from './commands/Invoker.mjs'
import { ProccessFileSaveAnki } from './commands/ProccessFileSaveAnki.mjs'
// ^M\s[\s\S]{1,}
function main()
{
    let invoker = new Invoker()

    invoker.setCommand(
        '-f',
        new ProccessFileSaveAnki(
            {
                _invoke() {console.log('Deu certo')}
            }
        ),
        argv[3]
    )

    invoker.handle(argv[2])
}

main()

// const path = join(__dirname,'..','teste.txt')
    // let file = readline.createInterface({
    //     input: createReadStream(path),
    //     output: process.stdout,
    //     terminal: false
    // })

    // let c = 0
    // let limit = 3
    // let data = ''
    // let queue = new Queue()

    // file.on('line', line => {
    //     if (line === '.' && c !== limit) throw new Error('O Ponto está no lugar errado')

    //     if (line === '.' && c === limit) {
    //         queue.enqueue(data)
    //         c = 0
    //         data = ''
    //     } else {
    //         data+=line+'&'
    //         c++
    //     }
    // })

    // file.on('close',()=>{
    //     console.log(queue)
    // })