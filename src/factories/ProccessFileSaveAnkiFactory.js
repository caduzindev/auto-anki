import { ProccessFileSaveAnki } from '../commands/ProccessFileSaveAnki.js'
import { ProccessFile } from '../services/ProccessFile.js'
import { File as FileHelper } from '../helpers/File.js'
import { File as FileModel } from '../models/File.js'
import { TagPattern } from '../models/TagPattern.js'

export default (path) =>
{
    const tagPattern = new TagPattern()
    const fileModel = new FileModel(tagPattern)
    const fileHelper = new FileHelper()
    const proccessFile = new ProccessFile(fileHelper,fileModel)
    const proccessFileSaveAnki = new ProccessFileSaveAnki(proccessFile,path)

   return proccessFileSaveAnki
}