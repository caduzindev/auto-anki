import { jest } from '@jest/globals';
import { AnkiManagerNote } from "../../../../src/services/Anki/AnkiManagerNote";
//deckName:'cobaia',
//front: data.F,
//back: `${data.M} ${data.T}`,
//audio: true

const Sut = ()=>{
    const mockAnkiRequest = {
        createNote: jest.fn()
    }
    const sut = new AnkiManagerNote(mockAnkiRequest)

    return {
        sut,
        mockAnkiRequest
    }
}

describe('AnkiManagerNote', () => {
    test('should throw error if missing deckName',()=>{
       const data = {
        front: 'front',
        back: 'back',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).toThrowError(new Error('Campo deckName não informado'))
    })
    test('should throw error if missing front',()=>{
       const data = {
        deckName: 'cobaia',
        back: 'back',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).toThrowError(new Error('Campo front não informado'))
    })
    test('should throw error if missing back',()=>{
       const data = {
        deckName: 'cobaia',
        front: 'front',
        audio: true
       }

       const { sut } = Sut()

       expect(()=>sut.addNote(data)).toThrowError(new Error('Campo back não informado'))
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
});