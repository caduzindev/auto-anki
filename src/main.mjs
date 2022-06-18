import { argv } from 'node:process'
import { Invoker } from './commands/Invoker.mjs'
import { ProccessFileSaveAnki } from './commands/ProccessFileSaveAnki.mjs'
import { ProccessFile } from './services/ProccessFile.mjs'
import { File as FileHelper } from './helpers/File.mjs'
import { File as FileModel } from './models/File.mjs'
// ^M\s[\s\S]{1,}
function main()
{
    let invoker = new Invoker()

    invoker.setCommand(
        '-f',
        new ProccessFileSaveAnki(
            new ProccessFile(
                new FileHelper(),
                new FileModel()
            ),
            argv[3]
        ),
    )

    invoker.handle(argv[2])
}

main()