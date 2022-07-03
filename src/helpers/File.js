import { createReadStream, existsSync,writeFileSync } from 'node:fs'
import { extname,join } from 'node:path'
import { v4 } from 'uuid'
class File
{
    static _mimeTypes = ['mp3']
    static fileServerPath = process.env.FILE_SERVER_PATH || ''
    static fileServerHost = process.env.FILE_SERVER_HOST || 'http://localhost/'

    static fileExists(path)
    {
        return existsSync(path)
    }

    static fileExtension(path)
    {
        return extname(path)
    }

    static streamOfFile(path)
    {
        return createReadStream(path)
    }

    static saveFileStaticServer(data,mimeType)
    {
        if (!this._mimeTypes.includes(mimeType)) throw new Error(`${mimeType} não e uma extensão valida`)

        const filename = `${v4()}.${mimeType}`

        writeFileSync(join(this.fileServerPath,filename),data)

        return {
            filename,
            url: this.fileServerHost+filename
        }
    }
    static deleteFileStaticServer()
    {

    }
}

export default File