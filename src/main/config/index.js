import { Aws } from '../../helpers/Aws'
import Cli from './cli'

export function initApp()
{
    Cli()
    Aws.initialize()
}