export class AnkiManagerNote
{
    constructor(ankiRequest)
    {
        this.ankiRequest = ankiRequest
    }

    async addNote(obj)
    {
        const requiredFields = ['deckName','front','back']

        for (const field of requiredFields)
        {
            if (!obj[field]) throw new Error(`Campo ${field} não informado`)
        }

        await this.ankiRequest.createNote(obj)
    }
}