import { createReadStream, existsSync,writeFileSync } from 'node:fs'
import { extname,join } from 'node:path'
import { v4 } from 'uuid'
class File
{
    static #mimeTypes = ['mp3']

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
        if (!this.#mimeTypes.includes(mimeType)) throw new Error(`${mimeType} não e uma extensão valida`)

        const filename = `${v4()}.${mimeType}`

        writeFileSync(join(process.env.FILE_SERVER_PATH,filename),data)

        return {
            filename,
            url: process.env.FILE_SERVER_HOST+filename
        }
    }
    static deleteFileStaticServer()
    {

    }
}

export default File