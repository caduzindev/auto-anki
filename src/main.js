import { argv } from 'node:process'
import { Invoker } from './commands/Invoker.js'
import { ProccessFileSaveAnki } from './commands/ProccessFileSaveAnki.js'
import { ProccessFile } from './services/ProccessFile.js'
import { File as FileHelper } from './helpers/File.js'
import { File as FileModel } from './models/File.js'
import { TagPattern } from './models/TagPattern.js'
// ^M\s[\s\S]{1,}
function main()
{
    let invoker = new Invoker()

    invoker.setCommand(
        '-f',
        new ProccessFileSaveAnki(
            new ProccessFile(
                new FileHelper(),
                new FileModel(new TagPattern())
            ),
            argv[3]
        ),
    )

    invoker.handle(argv[2])
}

main()