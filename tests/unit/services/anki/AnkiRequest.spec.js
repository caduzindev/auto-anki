import { AnkiRequest } from "../../../../src/services/anki/AnkiRequest"
import Http from '../../../../src/helpers/Http'

const template = obj => ({
    action: "addNote",
    version: 6,
    params: {
        note: {
            deckName: "cobaia",
            modelName: "Basic",
            fields: {
                Front: obj.front,
                Back: obj.back
            },
            audio: [{
                url: obj.audioInfo.url,
                filename: obj.audioInfo.filename,
                fields: [
                    "Front"
                ]
            }]
        }
    }
})

const Sut = ()=>{
    const mockAnkiModel = {
        getTemplateAction: jest.fn()
    }

    const sut = new AnkiRequest(mockAnkiModel)

    return {
        sut,
        mockAnkiModel
    }
}

describe('Test AnkiRequest',()=>{
    test('add note must be a success',async ()=>{
        const payload = {
            deckName: 'cobaia',
            front: 'front',
            back: 'back',
            audio: true,
            audioInfo: {
                filename: 'faker.mp3',
                url: 'http://localhost/faker.mp3'
            }
        }
        const expectTemplate = template(payload)
        const expectRequest = {
            port: 8765,
            path: '/',
            data: expectTemplate,
            method: 'POST'
        }

        const { sut, mockAnkiModel } = Sut()
        const httpPostSpy = jest.spyOn(Http,'post').mockReturnValueOnce(null)

        mockAnkiModel
            .getTemplateAction
            .mockReturnValueOnce(expectTemplate)

        sut.createNote(payload)

        expect(mockAnkiModel.getTemplateAction).toHaveBeenCalledWith('addNote',payload)
        expect(httpPostSpy).toHaveBeenCalledWith(expectRequest)
    })
})