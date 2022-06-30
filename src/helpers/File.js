import { createReadStream, existsSync } from 'node:fs'
import { extname } from 'node:path'

class File
{
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
}

export default File