import FileTxt from '../../collections/FileTxt'
import FileHelper from '../../helpers/File'
export class ProccessFile
{
    constructor (fileModel,ankiManagerNote) {
        this.fileModel = fileModel
        this.ankiManagerNote = ankiManagerNote
    }

    async sendAnki(path)
    {
        if (!FileHelper.fileExists(path)) throw new Error('O arquivo não existe')
        if (FileHelper.fileExtension(path) !== '.txt') throw new Error('O arquivo deve ser .txt')

        const stream = FileHelper.streamOfFile(path)
        const file = new FileTxt(stream)

        const result = this.fileModel.extractStructureFromLines(file)

        for await (let data of result) {
            await this.ankiManagerNote.addNote({
                deckName: 'mineração',
                front: data.F,
                back: `${data.M} ${data.T}`,
                audio: true
            })
        }
    }
}