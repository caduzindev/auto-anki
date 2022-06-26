import { jest } from '@jest/globals';
import { Readable } from 'stream'
import { ProccessFile } from "../../../src/services/ProccessFile.js"

const Sut = () => {
    const mockFileHelper = {
        fileExists: jest.fn(),
        fileExtension: jest.fn(),
        streamOfFile: jest.fn()
    }
    const mockFileModel = {
        extractStructureFromLines: jest.fn(),
    }
    const mockAnkiManager = {
        addNote: jest.fn()
    }

    const sut = new ProccessFile(mockFileHelper,mockFileModel,mockAnkiManager)

    return {
        sut,
        mockFileHelper,
        mockFileModel,
        mockAnkiManager
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

        const { sut, mockFileHelper, mockFileModel, mockAnkiManager} = Sut()

        mockFileHelper
            .fileExists
            .mockReturnValueOnce(true)

        mockFileHelper
            .streamOfFile
            .mockReturnValueOnce(stream)

        mockFileHelper
            .fileExtension
            .mockReturnValueOnce('.txt')

        mockFileModel
            .extractStructureFromLines
            .mockReturnValueOnce(payload())

        await sut._invoke(path)

        expect(mockFileHelper.fileExists).toHaveBeenCalledWith(path)
        expect(mockFileHelper.fileExtension).toHaveBeenCalledWith(path)
        expect(mockFileHelper.streamOfFile).toHaveBeenCalledWith(path)

        expect(mockAnkiManager.addNote).toHaveBeenCalledWith({
            deckName:'cobaia',
            front: data.F,
            back: `${data.M} ${data.T}`,
            audio: true
        })
    })
})