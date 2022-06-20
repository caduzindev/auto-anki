import { createReadStream } from 'fs'
import { FileTxt } from '../collections/FileTxt.js'

export class ProccessFile
{
    constructor (fileHelper,fileModel) {
        this.fileHelper = fileHelper
        this.fileModel = fileModel
    }

    async _invoke(path)
    {
        if (!path) throw new Error('Caminho não informado')
        if (!this.fileHelper.fileExists(path)) throw new Error('O arquivo não existe')
        if (this.fileHelper.fileExtension(path) !== '.txt') throw new Error('O arquivo deve ser .txt')

        const file = new FileTxt(createReadStream(path))

        const result = this.fileModel.extractStructureFromLines(file)

        for await (let data of result) {
            console.log(data)
        }
    }
}