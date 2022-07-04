export class Anki
{
    _templates = {
        'addNote': (obj)=> this.#addNoteTemplate(obj)
    }

    getTemplateAction(type,obj)
    {
        if (this._templates[type]) return this._templates[type](obj)

        throw new Error(`action type ${type} não existe`)
    }

    #addNoteTemplate(obj)
    {
        let json = {
            action: "addNote",
            version: 6,
            params: {
                note: {
                    deckName: obj.deckName,
                    modelName: "Basic",
                    fields: {
                        Front: obj.front,
                        Back: obj.back
                    }
                }
            }
        }

        if (obj.audio)
        {
            json.params.note.audio = [
                {
                    url: obj.audioInfo.url,
                    filename: obj.audioInfo.filename,
                    fields: [
                        "Front"
                    ]
                }
            ]
        }

        return json
    }
}