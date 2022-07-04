import { Anki } from "../../../src/models/anki/Anki"

const template = obj => ({
    action: "addNote",
    version: 6,
    params: {
        note: {
            deckName: obj.deckName,
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

const Sut = () => new Anki()

describe('Teste Anki',()=>{
    test('should return template correct',()=>{
        const payload = {
            deckName: 'teste',
            front: 'front',
            back: 'back',
            audio: true,
            audioInfo: {
                filename: 'faker.mp3',
                url: 'http://localhost/faker.mp3'
            }
        }

        const sut = Sut()

        const templateResult = sut.getTemplateAction('addNote',payload)

        expect(templateResult).toEqual(template(payload))
    })
})