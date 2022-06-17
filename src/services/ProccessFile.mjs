import { createReadStream } from 'fs'
import { FileTxt } from '../collections/FileTxt.mjs'

export class ProccessFile
{
    constructor (fileHelper) {
        this.fileHelper = fileHelper
    }

    _invoke(path)
    {
        if (!path) throw new Error('Caminho não informado')
        if (!this.fileHelper.fileExists(path)) throw new Error('O arquivo não existe')
        if (this.fileHelper.fileExtension(path) !== '.txt') throw new Error('O arquivo deve ser .txt')

        const file = new FileTxt(createReadStream(path))
    }
}