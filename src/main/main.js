import { Command } from 'commander'
import ProccessFileSaveAnkiFactory from './factories/ProccessFileSaveAnki.js'

function main()
{
    const program = new Command()

    program
        .name('auto-anki')
        .description('CLI para automações do anki')
        .version('0.0.1')

    program.command('send-file')
        .description('send-file processa arquivos com frases para serem salvos no anki')
        .argument('<path>','arquivo a ser procesado')
        .action(path=>ProccessFileSaveAnkiFactory(path).execute())

    program.parse()
}

main()