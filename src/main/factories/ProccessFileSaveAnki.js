import { ProccessFileSaveAnki } from '../commands/ProccessFileSaveAnki'
import { ProccessFile } from '../../services/file/ProccessFile'
import { File as FileModel } from '../../models/file/File'
import { TagPattern } from '../../models/file/TagPattern'
import { AnkiManagerNote } from '../../services/anki/AnkiManagerNote'

export default (path) =>
{
    const tagPattern = new TagPattern()
    const fileModel = new FileModel(tagPattern)
    const ankiManagerNote = new AnkiManagerNote()
    const proccessFile = new ProccessFile(fileModel,ankiManagerNote)
    const proccessFileSaveAnki = new ProccessFileSaveAnki(proccessFile,path)

   return proccessFileSaveAnki
}