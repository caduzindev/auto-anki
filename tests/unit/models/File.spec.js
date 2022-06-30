import { jest } from '@jest/globals';
import { File } from "../../../src/models/file/File"
import { createInterface } from 'readline'
import { Readable } from 'stream'

const Sut = () => {
    const mockTagPattern = {
        inTagPattern: jest.fn(),
        replaceTagPattern: jest.fn()
    }
    const sut = new File(mockTagPattern)

    return {
        sut,
        mockTagPattern
    }
}

describe('Test model File', () => {
    test('Test if the returned stream is correct', async () => {
        const fakeFile = {
            getData: () => {
                return createInterface({
                    input: new Readable({
                        read(){
                            this.push('M fine\n')
                            this.push('F I am fine\n')
                            this.push('T (bem)\n')
                            this.push('.')
                            this.push(null)
                        }
                    }),
                    output: process.stdout,
                    terminal: false,
                })
            }
        }

        const returnExpected = {
            "M": "fine",
            "F": "I am fine",
            "T": "(bem)"
        }

        const { sut, mockTagPattern } = Sut()

        mockTagPattern
            .inTagPattern
            .mockReturnValueOnce('M')
            .mockReturnValueOnce('F')
            .mockReturnValueOnce('T')

        mockTagPattern
            .replaceTagPattern
            .mockReturnValueOnce('fine')
            .mockReturnValueOnce('I am fine')
            .mockReturnValueOnce('(bem)')

        let result = sut.extractStructureFromLines(fakeFile)

        for await (const obj of result) {
            expect(obj).toEqual(returnExpected)
        }
    })

    test('Test fail with structure incorrect', async ()=>{
        const fakeFile = {
            getData: () => {
                return createInterface({
                    input: new Readable({
                        read(){
                            this.push('M fine\n')
                            this.push('F I am fine\n')
                            this.push('.\n')
                            this.push('T (bem)')
                            this.push(null)
                        }
                    }),
                    output: process.stdout,
                    terminal: false,
                })
            }
        }

        const { sut, mockTagPattern } = Sut()

        mockTagPattern
            .inTagPattern
            .mockReturnValueOnce('M')
            .mockReturnValueOnce('F')

        mockTagPattern
            .replaceTagPattern
            .mockReturnValueOnce('fine')
            .mockReturnValueOnce('I am fine')

        let result = sut.extractStructureFromLines(fakeFile)

        const resultGenerator = async () => {for await (const obj of result) {}}

        await expect(resultGenerator).rejects.toThrowError(new Error('O Ponto está no lugar errado'))
    })
})