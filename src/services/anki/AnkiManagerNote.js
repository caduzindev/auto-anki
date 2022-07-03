export class AnkiManagerNote
{
    constructor(ankiRequest,textToSpeech)
    {
        this.ankiRequest = ankiRequest
        this.textToSpeech = textToSpeech
    }

    async addNote(obj)
    {
        const requiredFields = ['deckName','front','back']

        for (const field of requiredFields)
        {
            if (!obj[field]) throw new Error(`Campo ${field} não informado`)
        }

        if (!!obj.audio) {
            const data = this.textToSpeech.textToAudio(obj.front)
            obj.audioInfo = data
        }

        await this.ankiRequest.createNote(obj)
    }
}