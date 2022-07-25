import axios from 'axios'
class Http
{
    static async post(obj)
    {
        return new Promise((resolve,reject)=>{
            axios({
                url: obj.url,
                method: 'POST',
                data: obj.data
            })
            .then(response=>resolve(response.data))
            .catch(error=>reject(error))
        })
    }
}

export default Http