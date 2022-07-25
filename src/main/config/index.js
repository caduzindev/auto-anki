import Aws from '../../helpers/Aws'
import Cli from './cli'
import Enviroments from './enviroments'

export function initApp()
{
    Enviroments()
    Aws.initialize()
    Cli()
}