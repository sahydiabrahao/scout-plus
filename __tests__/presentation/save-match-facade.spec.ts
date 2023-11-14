import { type JsonResquest } from '@/domain/protocols/json-request'
import { type MatchModel } from '@/domain/protocols/match-model'
import { type SaveMatch, type SaveMatchModel } from '@/domain/save-match'
import { SaveMatchFacade } from '@/presentation/save-match-facade'

const makeFakeResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date',
      homeTeamScore: 1,
      awayTeamScore: 1,
      players: [{
        name: 'any_name',
        tshirtNumber: 1,
        labels: [{
          goalInsideTheBox: 1,
          goalOutsideTheBox: 1
        }]
      }]
    }
  }
}

const makeSaveMatch = (): SaveMatch => {
  class SaveMatchSpy implements SaveMatch {
    async save (SaveMatch: SaveMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new SaveMatchSpy()
}

  type SutTypes = {
    sut: SaveMatchFacade
    saveMatchSpy: SaveMatch
  }

const makeSut = (): SutTypes => {
  const saveMatchSpy = makeSaveMatch()
  const sut = new SaveMatchFacade(saveMatchSpy)
  return {
    sut,
    saveMatchSpy
  }
}

describe('SaveMatchFacade', () => {
  test('Must call saveMatch with correct values', async () => {
    const { sut, saveMatchSpy } = makeSut()
    const saveSpy = jest.spyOn(saveMatchSpy, 'save')
    await sut.handle(makeFakeResquest())
    expect(saveSpy).toBeCalledWith(makeFakeResquest())
  })

  test('Must return Error if saveMatch fails', async () => {
    const { sut, saveMatchSpy } = makeSut()
    jest.spyOn(saveMatchSpy, 'save').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Error')
  })

  test('Must return Success and Data if saveMatch Success',async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Success')
    expect(response.body).not.toBeNull()
  })
})
