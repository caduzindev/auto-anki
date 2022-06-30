import AwsLib from 'aws-sdk'

export class Aws
{
    _polly = null;
    static initialize()
    {
        let credentials = new AwsLib.SharedIniFileCredentials()
        AwsLib.config.credentials = credentials

        AwsLib.config.getCredentials(err=>{
            if (err) console.log(err.stack)
        })
    }

    static getPolly()
    {
        if (!this._polly) {
            this._polly = new AwsLib.Polly()

            return this._polly
        }

        return this._polly;
    }
}