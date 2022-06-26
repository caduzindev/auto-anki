import { ProccessFileSaveAnki } from '../commands/ProccessFileSaveAnki.js'
import { ProccessFile } from '../services/file/ProccessFile.js'
import { File as FileHelper } from '../helpers/File.js'
import { File as FileModel } from '../models/file/File.js'
import { TagPattern } from '../models/file/TagPattern.js'
import { AnkiManagerNote } from '../services/anki/AnkiManagerNote.js'

export default (path) =>
{
    const tagPattern = new TagPattern()
    const fileModel = new FileModel(tagPattern)
    const fileHelper = new FileHelper()
    const ankiManagerNote = new AnkiManagerNote()
    const proccessFile = new ProccessFile(fileHelper,fileModel,ankiManagerNote)
    const proccessFileSaveAnki = new ProccessFileSaveAnki(proccessFile,path)

   return proccessFileSaveAnki
}