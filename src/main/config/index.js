import Aws from '../../helpers/Aws'
import Cli from './cli'
import Enviroments from './enviroments'
import FileServer from './fileserver'

export function initApp()
{
    Enviroments()
    FileServer()
    Aws.initialize()
    Cli()
}