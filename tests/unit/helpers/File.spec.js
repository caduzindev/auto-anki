import FileHelper from '../../../src/helpers/File'
import { join } from 'path'
import * as uuid from 'uuid'
import fs from 'fs'

jest.mock('uuid')

describe('Test FileHelper',()=>{
    test('test saveFileStaticServer with extension invalid',()=>{
        const extension = 'pdf'

        expect(()=>{
            FileHelper.saveFileStaticServer('blob',extension)
        }).toThrowError(new Error(`${extension} não e uma extensão valida`))
    })

    test('test saveFileStaticServer should return object valid',()=>{
        const extension = 'mp3'
        const filename = 'faker'
        const finalFilename = filename+'.'+extension

        uuid.v4.mockReturnValueOnce(filename)

        const pathAbs = join(FileHelper.fileServerPath,finalFilename)

        const writeFileSyncSpy = jest.spyOn(fs,'writeFileSync').mockReturnValueOnce(null)

        const data = FileHelper.saveFileStaticServer('abc',extension)

        expect(writeFileSyncSpy).toHaveBeenCalledWith(pathAbs,'abc')
        expect(data).toEqual({
            filename: finalFilename,
            url: FileHelper.fileServerHost+finalFilename
        })
    })
})