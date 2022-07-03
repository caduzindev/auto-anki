import Http from '../../helpers/Http'

export class AnkiRequest
{
    constructor(ankiModel)
    {
        this.ankiModel = ankiModel
    }

    async createNote(obj)
    {
        const template = this.ankiModel.getTemplateAction('addNote',obj)

        await Http.post({
            port: 8765,
            path: '/',
            data: template,
            method: 'POST'
        })
    }
}