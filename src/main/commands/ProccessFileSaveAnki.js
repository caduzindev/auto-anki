export class ProccessFileSaveAnki
{
    constructor (service,path)
    {
        this.service = service
        this.path = path
    }

    execute()
    {
        this.service.sendAnki(this.path)
    }
}