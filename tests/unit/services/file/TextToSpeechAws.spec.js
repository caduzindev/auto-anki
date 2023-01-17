import AWS from 'aws-sdk'
import AwsMock from 'aws-sdk-mock'
import { TextToSpeechAws } from '../../../../src/services/file/TextToSpeechAws'
import FileHelper from '../../../../src/helpers/File'

AwsMock.setSDKInstance(AWS)
const Sut = () => {
    return new TextToSpeechAws()
}

describe('TextToSpeechAws', () => {
    test('should retun uri correct',async ()=>{
        const data = {
            AudioStream: 'blabla'
        }

        AwsMock.mock('Polly','synthesizeSpeech',function (params,callback) {
            callback(null,data)
        })

        const saveFileStaticServerSpy = jest.spyOn(FileHelper,'saveFileStaticServer')

        saveFileStaticServerSpy.mockReturnValueOnce('http://fakerName.mp3')

        const sut = Sut()

        const result = await sut.textToAudio('sdadsd')

        AwsMock.restore()

        expect(result).toBe('http://fakerName.mp3')
        expect(saveFileStaticServerSpy).toHaveBeenCalledWith(data.AudioStream,'mp3')
    })
});