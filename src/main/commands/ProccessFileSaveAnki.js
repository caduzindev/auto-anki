export class ProccessFileSaveAnki
{
    constructor (service,path)
    {
        this.service = service
        this.path = path
    }

    execute(_callback=()=>{})
    {
        this.service.sendAnki(this.path)
            .then(()=>_callback())
    }
}