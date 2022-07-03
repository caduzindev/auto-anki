import { jest } from '@jest/globals';
import { AnkiManagerNote } from "../../../../src/services/Anki/AnkiManagerNote";

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
    test('call success without audio',()=>{
       const data = {
        deckName: 'cobaia',
        front: 'front',
        back: 'back'
       }

       const { sut, mockAnkiRequest } = Sut()

       sut.addNote(data)

       expect(mockAnkiRequest.createNote).toHaveBeenCalledWith(data)
    })
    test('call success with audio',()=>{
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
            .mockReturnValueOnce(expectReturn)

       sut.addNote(data)

       expect(mockAnkiRequest.createNote).toHaveBeenCalledWith({...data,audioInfo: expectReturn})
       expect(mockTextToSpeech.textToAudio).toHaveBeenCalledWith(data.front)
       expect(mockTextToSpeech.textToAudio).toHaveBeenCalledWith(data.front)
    })
});