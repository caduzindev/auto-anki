import { File } from "../../../src/models/File.mjs"
import { Readable } from 'stream'
import { createInterface } from 'readline'

const Sut = () => {
    const mockTagPattern = jest.fn().mockImplementation(()=>({
        inTagPattern: jest.fn(),
        replaceTagPattern: jest.fn()
    }))
    const sut = new File(mockTagPattern)

    return {
        sut,
        mockTagPattern
    }
}

describe('Test model File', () => {
    test('Test if the returned stream is correct', () => {
        const fakeFile = createInterface(
        {
            input: new Readable({
                read(){
                    this.push('M fine')
                    this.push('F I am fine')
                    this.push('T (bem)')
                    this.push('.')
                }
            }),
            output: process.stdout,
            terminal: false
        })

        const returnExpected = {
            "M": "fine",
            "F": "I am fine",
            "T": "(bem)"
        }

        const { sut, mockTagPattern } = Sut()

        mockTagPattern
            .inTagPattern
            .mockReturnValueOnce('fine')
            .mockReturnValueOnce('I am fine')
            .mockReturnValueOnce('(bem)')

        mockTagPattern
            .replaceTagPattern
            .mockReturnValueOnce('M')
            .mockReturnValueOnce('F')
            .mockReturnValueOnce('T')

        const result = sut.extractStructureFromLines(fakeFile)

        result.on('data',data => {
            expect(JSON.parse(data)).toEqual(returnExpected)
        })
    })
})