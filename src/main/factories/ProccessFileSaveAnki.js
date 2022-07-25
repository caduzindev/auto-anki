import { ProccessFileSaveAnki } from '../commands/ProccessFileSaveAnki'
import { ProccessFile } from '../../services/file/ProccessFile'
import { File as FileModel } from '../../models/file/File'
import { TagPattern } from '../../models/file/TagPattern'
import { AnkiManagerNote } from '../../services/anki/AnkiManagerNote'
import { AnkiRequest } from '../../services/anki/AnkiRequest'
import { Anki as AnkiModel } from '../../models/anki/Anki'
import { TextToSpeechAws } from '../../services/file/TextToSpeechAws'

export default (path) =>
{
    const tagPattern = new TagPattern()
    const fileModel = new FileModel(tagPattern)

    const ankiModel = new AnkiModel()
    const ankiRequest = new AnkiRequest(ankiModel)
    const textToSpeechAws = new TextToSpeechAws()

    const ankiManagerNote = new AnkiManagerNote(ankiRequest,textToSpeechAws)
    const proccessFile = new ProccessFile(fileModel,ankiManagerNote)
    const proccessFileSaveAnki = new ProccessFileSaveAnki(proccessFile,path)

   return proccessFileSaveAnki
}