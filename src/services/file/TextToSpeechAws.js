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
                    SampleRate: '22050',
                    Text: text,
                    TextType: 'text',
                    VoiceId: 'Joanna'
                },function (err,buffer) {
                    const data = FileHelper.saveFileStaticServer(buffer.AudioStream,'mp3')
                    resolve(data)
                })
        })
    }
}