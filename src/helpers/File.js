import { createReadStream, existsSync } from 'node:fs'
import { extname } from 'node:path'

export class File
{
    fileExists(path)
    {
        return existsSync(path)
    }

    fileExtension(path)
    {
        return extname(path)
    }

    streamOfFile(path)
    {
        return createReadStream(path)
    }
}