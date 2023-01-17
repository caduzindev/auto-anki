import { AnkiManagerNote } from "../../../../src/services/anki/AnkiManagerNote";

const Sut = ()=>{
    const mockAnkiRequest = {
        createNote: jest.fn()
    }
    const mockTextToSpeech = {
        textToAudio: jest.fn()
    }
    const sut = new AnkiManagerNote(mockAnkiRequest,mockTextToSpeech)

    return {
        sut,
        mockAnkiRequest,
        mockTextToSpeech
    }
}

describe('AnkiManagerNote', () => {
    test('should throw error if missing deckName',async ()=>{
       const data = {
        front: 'front',
        back: 'back',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).rejects.toThrowError(new Error('Campo deckName não informado'))
    })
    test('should throw error if missing front',async ()=>{
       const data = {
        deckName: 'cobaia',
        back: 'back',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).rejects.toThrowError(new Error('Campo front não informado'))
    })
    test('should throw error if missing back',async ()=>{
       const data = {
        deckName: 'cobaia',
        front: 'front',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).rejects.toThrowError(new Error('Campo back não informado'))
    })
    test('call success without audio',async ()=>{
       const data = {
        deckName: 'cobaia',
        front: 'front',
        back: 'back'
       }

       const { sut, mockAnkiRequest } = Sut()

       await sut.addNote(data)

       expect(mockAnkiRequest.createNote).toHaveBeenCalledWith(data)
    })
    test('call success with audio',async ()=>{
       const data = {
        deckName: 'cobaia',
        front: 'front',
        back: 'back',
        audio: true
       }
       const expectReturn = {
            filename: 'faker.mp3',
            url: 'http://localhost/faker.mp3'
        }
       const { sut, mockAnkiRequest, mockTextToSpeech } = Sut()
       mockTextToSpeech
            .textToAudio
            .mockImplementation(()=>{
                return new Promise((resolve) => resolve(expectReturn))
            })

       await sut.addNote(data)

       expect(mockAnkiRequest.createNote).toHaveBeenCalledWith({...data,audioInfo: expectReturn})
       expect(mockTextToSpeech.textToAudio).toHaveBeenCalledWith(data.front)
    })
});