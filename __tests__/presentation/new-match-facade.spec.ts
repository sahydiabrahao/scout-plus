import { type NewMatch, type NewMatchModel } from '@/domain/new-match'
import { type JsonResquest } from '@/domain/protocols/json-request'
import { type MatchModel } from '@/domain/protocols/match-model'
import { NewMatchFacade } from '@/presentation/new-match-facade'

const makeFakeResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_data',
      homeTeam: 'any_name',
      homeTeamShortHand: 'any_shortand',
      awayTeam: 'any_shortand',
      awayTeamShortHand: 'any_name'
    }
  }
}

const makeNewMatch = (): NewMatch => {
  class NewMatchSpy implements NewMatch {
    async new (newMatch: NewMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new NewMatchSpy()
}

type SutTypes = {
  sut: NewMatchFacade
  newMatchSpy: NewMatch
}

const makeSut = (): SutTypes => {
  const newMatchSpy = makeNewMatch()
  const sut = new NewMatchFacade(newMatchSpy)
  return {
    sut,
    newMatchSpy
  }
}

describe('NewMatchFacade', () => {
  test('Must call newMatch with correts values',async () => {
    const { sut, newMatchSpy } = makeSut()
    const newSpy = jest.spyOn(newMatchSpy, 'new')
    await sut.handle(makeFakeResquest())
    expect(newSpy).toHaveBeenLastCalledWith(makeFakeResquest())
  })

  test('Must return Error if newMatch fails', async () => {
    const { sut, newMatchSpy } = makeSut()
    jest.spyOn(newMatchSpy, 'new').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Error')
  })

  test('Must return Success and Data if newMatch Success',async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Success')
    expect(response.body).not.toBeNull()
  })
})
