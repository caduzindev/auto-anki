import { request } from 'http'

class Http
{
    static _config = {
        host: 'localhost',
        port: 80,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    static async post(obj)
    {
        return new Promise((resolve,reject)=>{
            const requiredFields = ['data','path','method']

            for (const field of requiredFields)
            {
                if (!obj[field]) throw new Error(`Campo ${field} não informado`)
            }

            const data = JSON.stringify(obj.data)
            const req = request({
                ...this._config,
                ...obj
            },res => {
                let body = ''

                res.on('data',data=> body += data)
                res.on('end',() => resolve(body))
            })
            req.on('error',(e) => reject(e.message))

            req.write(data)
            req.end()
        })
    }
}

export default Http