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
            url: 'http://localhost:8765',
            data: template
        })
    }
}