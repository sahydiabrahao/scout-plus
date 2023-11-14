/* eslint-disable no-useless-catch */
import { type SaveMatch, type SaveMatchModel } from '@/domain/save-match'
import { type SaveMatchRepository } from '@/data/protocols/save-match-repository'
import { type MatchModel } from '@/domain/protocols/match-model'

export class DbSaveMatch implements SaveMatch {
  constructor (private readonly SaveMatchRepository: SaveMatchRepository) {}

  async save (SaveMatch: SaveMatchModel): Promise<MatchModel> {
    try {
      const match = await this.SaveMatchRepository.save(SaveMatch)
      return match
    } catch (error) {
      throw error
    }
  }
}
