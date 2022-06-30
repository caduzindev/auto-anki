import { Aws } from '../../helpers/Aws.js'
import Cli from './cli.js'

export function initApp()
{
    Cli()
    Aws.initialize()
}