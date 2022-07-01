import AwsHelper from '../../helpers/Aws'
import FileHelper from '../../helpers/File'

export class TextToSpeechAws
{
    constructor(){}

    async textToAudio(text)
    {
        return new Promise((resolve)=>{
            AwsHelper
                .getPolly()
                .synthesizeSpeech({
                    Engine: 'standard',
                    OutputFormat: 'mp3',
                    SampleRate: '8000',
                    Text: text,
                    TextType: 'text',
                    VoiceId: 'Nicole'
                },function (err,data) {
                    const url = FileHelper.saveFileStaticServer(data,'mp3')
                    resolve(url)
                })
        })
    }
}