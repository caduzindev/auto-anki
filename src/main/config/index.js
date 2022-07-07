import { Aws } from '../../helpers/Aws'
import Cli from './cli'
import Enviroments from './enviroments'
import FileServer from './fileserver'

export function initApp()
{
    Enviroments()
    const server = FileServer()
    Cli()
    Aws.initialize()
    server.close()
}