import fs from 'fs.promises'
import { type JsonResquest } from '@/domain/protocols/json-request'
import { FsPromisesAdapter } from '@/infra/fs-promises-adapter'

const makeFakeDeleteResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date'
    }
  }
}

const makeFakeSaveResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date',
      homeTeam: 'change_name',
      homeTeamShortHand: 'any_shortand',
      awayTeam: 'any_shortand',
      awayTeamShortHand: 'any_name',
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

const makeFakeNewResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date',
      homeTeam: 'change_name',
      homeTeamShortHand: 'any_shortand',
      awayTeam: 'any_shortand',
      awayTeamShortHand: 'any_name'
    }
  }
}

type SutTypes = {
  sut: FsPromisesAdapter
}

const makeSut = (): SutTypes => {
  const sut = new FsPromisesAdapter()
  return {
    sut
  }
}

describe('FsPromisesAdapter New', () => {
  beforeEach(async () => {
    const filePath = './src/infra/matchs/scout-db.json'
    await fs.writeFile(filePath, JSON.stringify([]))
  })

  test('Must call writeFile with corret values', async () => {
    const { sut } = makeSut()
    const newSpy = jest.spyOn(fs, 'writeFile')
    await sut.new(makeFakeNewResquest())
    expect(newSpy).toHaveBeenCalled()
  })

  test('Must throw if writeFile throw', async () => {
    const { sut } = makeSut()
    jest.spyOn(fs, 'writeFile').mockImplementationOnce(() => { throw new Error() })
    const response = sut.new(makeFakeNewResquest())
    await expect(response).rejects.toThrow()
  })

  test('Must return ID and create jsonfile if writeFile Success', async () => {
    const { sut } = makeSut()
    const response = await sut.new(makeFakeNewResquest())
    expect(response.id).not.toBeNull()
  })
})

describe('FsPromisesAdapter Save', () => {
  test('Must return ID and save jsonfile if writeFile Success', async () => {
    const { sut } = makeSut()
    const response = await sut.save(makeFakeSaveResquest())
    expect(response.id).not.toBeNull()
  })
})

describe('FsPromisesAdapter Delete', () => {
  test('Must return ID and delete match index if Success', async () => {
    const { sut } = makeSut()
    const response = await sut.delete(makeFakeDeleteResquest())
    expect(response.id).not.toBeNull()
  })
})
