import { type DeleteMatchRepository } from '@/data/protocols/delete-match-repository'
import { type NewMatchRepository } from '@/data/protocols/new-match-repository'
import { type SaveMatchRepository } from '@/data/protocols/save-match-repository'
import { type DeleteMatchModel } from '@/domain/delete-match'
import { type NewMatchModel } from '@/domain/new-match'
import { type MatchModel } from '@/domain/protocols/match-model'
import { type SaveMatchModel } from '@/domain/save-match'
import fs from 'fs.promises'

export class FsPromisesAdapter implements NewMatchRepository, SaveMatchRepository, DeleteMatchRepository {
  async new (newMatch: NewMatchModel): Promise<MatchModel> {
    let scoutDb = []
    const filePath = './src/infra/matchs/scout-db.json'
    const readFile = await fs.readFile(filePath)
    const contentFile = JSON.parse(readFile.toString())

    scoutDb = contentFile
    scoutDb.push(newMatch.body)
    await fs.writeFile(filePath, JSON.stringify(scoutDb))

    return { id: newMatch.body.date }
  }

  async save (saveMatch: SaveMatchModel): Promise<MatchModel> {
    const filePath = './src/infra/matchs/scout-db.json'
    const jsonData = await fs.readFile(filePath)
    const jsonDataObj = JSON.parse(jsonData.toString())

    const index = jsonDataObj.findIndex(match => match.date === saveMatch.body.date)

    const date = new Date()
    const formattedDate = date.toLocaleString('pt-BR', {
      timeStyle: 'medium',
      dateStyle: 'short'
    })

    saveMatch.body.date = formattedDate

    jsonDataObj[index] = saveMatch.body
    await fs.writeFile(filePath, JSON.stringify(jsonDataObj))

    return { id: saveMatch.body.date }
  }

  async delete (deleteMatch: DeleteMatchModel): Promise<MatchModel> {
    const filePath = './src/infra/matchs/scout-db.json'
    const jsonData = await fs.readFile(filePath)
    const jsonDataObj = JSON.parse(jsonData.toString())

    const index = jsonDataObj.findIndex(match => match.date === deleteMatch.body.date)

    const newMatches = jsonDataObj.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(jsonDataObj))

    return { id: deleteMatch.body.date }
  }
}
