import { type DeleteMatch, type DeleteMatchModel } from '@/domain/delete-match'
import { type JsonResquest } from '@/domain/protocols/json-request'
import { type MatchModel } from '@/domain/protocols/match-model'
import { DeleteMatchFacade } from '@/presentation/delete-match-facade'

const makeFakeResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_data'
    }
  }
}

const makeDeleteMatch = (): DeleteMatch => {
  class DeleteMatchSpy implements DeleteMatch {
    async delete (deleteMatch: DeleteMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new DeleteMatchSpy()
}

type SutTypes = {
  sut: DeleteMatchFacade
  deleteMatchSpy: DeleteMatch
}

const makeSut = (): SutTypes => {
  const deleteMatchSpy = makeDeleteMatch()
  const sut = new DeleteMatchFacade(deleteMatchSpy)
  return {
    sut,
    deleteMatchSpy
  }
}

describe('DeleteMatchFacade', () => {
  test('Must call deleteMatch with correts values',async () => {
    const { sut, deleteMatchSpy } = makeSut()
    const newSpy = jest.spyOn(deleteMatchSpy, 'delete')
    await sut.handle(makeFakeResquest())
    expect(newSpy).toHaveBeenLastCalledWith(makeFakeResquest())
  })

  test('Must return Error if deleteMatch fails', async () => {
    const { sut, deleteMatchSpy } = makeSut()
    jest.spyOn(deleteMatchSpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Error')
  })

  test('Must return Success and Data if deleteMatch Success',async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeResquest())
    expect(response.status).toEqual('Success')
    expect(response.body).not.toBeNull()
  })
})
