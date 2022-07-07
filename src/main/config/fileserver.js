import { Server } from 'node-static'
import { createServer } from 'http'

export default () => {
    const file = new Server(process.env.FILE_SERVER_PATH)
    const server = createServer((req,res)=>file.serve(req,res))

    server.listen(9999)

    return server
}