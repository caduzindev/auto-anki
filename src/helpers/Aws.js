import AwsLib from 'aws-sdk'

class Aws
{
    static #polly = null;
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
        if (!this.#polly) {
            this.#polly = new AwsLib.Polly()

            return this.#polly
        }

        return this.#polly;
    }
}

export default Aws