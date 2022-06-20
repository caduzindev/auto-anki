export class TagPattern
{
    constructor ()
    {
        this.patterns = {
            "M": /^M\s/,
            "F": /^F\s/,
            "T": /^T\s/,
        }
    }

    inTagPattern(text)
    {
        for (let letter of Object.keys(this.patterns)) {
            const test = text.search(this.patterns[letter])
            if (test !== -1) return letter
        }

        throw new Error(`A linha ${'->'+text+'<-'} está fora do padrão`)
    }
    replaceTagPattern(key,text)
    {
        return text.replace(this.patterns[key],'')
    }
}