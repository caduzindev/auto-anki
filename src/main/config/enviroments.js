import { join, resolve } from 'path'

export default ()=> {
    process.env.FILE_SERVER_PATH = join(resolve(),'fileserver')
    process.env.FILE_SERVER_HOST = 'http://localhost:9999/'
}