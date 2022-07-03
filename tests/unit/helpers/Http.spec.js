import Http from '../../../src/helpers/Http'

describe('Test Http', ()=>{
    test('should throw error if missing data (request post)',async ()=>{
       const data = {
        path: '/fake',
        method: 'POST',
       }

       expect(()=>Http.post(data)).rejects.toThrowError(new Error('Campo data não informado'))
    })
    test('should throw error if missing path (request post)',async ()=>{
       const data = {
        data: {},
        method: 'POST',
       }

       expect(()=>Http.post(data)).rejects.toThrowError(new Error('Campo path não informado'))
    })
    test('should throw error if missing method (request post)',async ()=>{
      const data = {
        path: '/fake',
        data: {},
       }

       expect(()=>Http.post(data)).rejects.toThrowError(new Error('Campo method não informado'))
    })
})