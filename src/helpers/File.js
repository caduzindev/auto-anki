import { createReadStream, existsSync } from 'node:fs'
import { extname } from 'node:path'
import { v4 } from 'uuid'
class File
{
    _mimeTypes = ['mp3']

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

    }
}

export default File