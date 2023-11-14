import { DbNewMatch } from '@/data/db-new-match'
import { type NewMatchRepository } from '@/data/protocols/new-match-repository'
import { type NewMatchModel } from '@/domain/new-match'
import { type JsonResquest } from '@/domain/protocols/json-request'
import { type MatchModel } from '@/domain/protocols/match-model'

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

const makeNewMatchRepository = (): NewMatchRepository => {
  class NewMatchRepositorySpy implements NewMatchRepository {
    async new (newMatch: NewMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new NewMatchRepositorySpy()
}

type SutTypes = {
  sut: DbNewMatch
  newMatchRepositorySpy: NewMatchRepository
}

const makeSut = (): SutTypes => {
  const newMatchRepositorySpy = makeNewMatchRepository()
  const sut = new DbNewMatch(newMatchRepositorySpy)
  return {
    sut,
    newMatchRepositorySpy
  }
}

describe('DbNewMatch', () => {
  test('Must call newMatchRepository with correts values',async () => {
    const { sut, newMatchRepositorySpy } = makeSut()
    const newSpy = jest.spyOn(newMatchRepositorySpy, 'new')
    await sut.new(makeFakeResquest())
    expect(newSpy).toHaveBeenLastCalledWith(makeFakeResquest())
  })

  test('Must throw if newMatchRepository throw', async () => {
    const { sut, newMatchRepositorySpy } = makeSut()
    jest.spyOn(newMatchRepositorySpy, 'new').mockImplementationOnce(() => { throw new Error() })
    const response = sut.new(makeFakeResquest())
    await expect(response).rejects.toThrow()
  })

  test('Must return ID if newMatchRepository Success', async () => {
    const { sut } = makeSut()
    const response = await sut.new(makeFakeResquest())
    expect(response.id).not.toBeNull()
  })
})
