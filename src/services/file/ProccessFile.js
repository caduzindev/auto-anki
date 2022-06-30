import FileTxt from '../../collections/FileTxt.js'

export class ProccessFile
{
    constructor (fileHelper,fileModel,ankiManagerNote) {
        this.fileHelper = fileHelper
        this.fileModel = fileModel
        this.ankiManagerNote = ankiManagerNote
    }

    async sendAnki(path)
    {
        if (!this.fileHelper.fileExists(path)) throw new Error('O arquivo não existe')
        if (this.fileHelper.fileExtension(path) !== '.txt') throw new Error('O arquivo deve ser .txt')

        const stream = this.fileHelper.streamOfFile(path)
        const file = new FileTxt(stream)

        const result = this.fileModel.extractStructureFromLines(file)

        for await (let data of result) {
            await this.ankiManagerNote.addNote({
                deckName: 'cobaia',
                front: data.F,
                back: `${data.M} ${data.T}`,
                audio: true
            })
        }
    }
}