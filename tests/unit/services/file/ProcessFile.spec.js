import { Readable } from 'stream'
import { ProccessFile } from "../../../../src/services/file/ProccessFile"
import FileHelper from '../../../../src/helpers/File'

const Sut = () => {
    const mockFileModel = {
        extractStructureFromLines: jest.fn(),
    }
    const mockAnkiManagerNote = {
        addNote: jest.fn()
    }

    const sut = new ProccessFile(mockFileModel,mockAnkiManagerNote)

    return {
        sut,
        mockFileModel,
        mockAnkiManagerNote
    }
}

describe('Test ProcessFile service',()=>{
    test('Test ProcessFile calls success', async ()=>{
        const path = './faker.txt'
        const stream = new Readable({
            read(){
                this.push(null)
            }
        })
        const data = {
            'M': 'I',
            'F': 'I am',
            'T': '(eu)'
        }
        const payload = async function * () {
            yield data
        }

        const { sut, mockFileModel, mockAnkiManagerNote} = Sut()

        const fileExists = jest.spyOn(FileHelper,'fileExists')
        const streamOfFile = jest.spyOn(FileHelper,'streamOfFile')
        const fileExtension = jest.spyOn(FileHelper,'fileExtension')

        fileExists.mockReturnValueOnce(true)

        streamOfFile.mockReturnValueOnce(stream)

        fileExtension.mockReturnValueOnce('.txt')

        mockFileModel
            .extractStructureFromLines
            .mockReturnValueOnce(payload())

        await sut.sendAnki(path)

        expect(fileExists).toHaveBeenCalledWith(path)
        expect(fileExtension).toHaveBeenCalledWith(path)
        expect(streamOfFile).toHaveBeenCalledWith(path)

        expect(mockAnkiManagerNote.addNote).toHaveBeenCalledWith({
            deckName:'cobaia',
            front: data.F,
            back: `${data.M} ${data.T}`,
            audio: true
        })
    })
})