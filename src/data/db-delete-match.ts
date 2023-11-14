/* eslint-disable no-useless-catch */
import { type DeleteMatch, type DeleteMatchModel } from '@/domain/delete-match'
import { type DeleteMatchRepository } from '@/data/protocols/delete-match-repository'
import { type MatchModel } from '@/domain/protocols/match-model'

export class DbDeleteMatch implements DeleteMatch {
  constructor (private readonly deleteMatchRepository: DeleteMatchRepository) {}

  async delete (deleteMatch: DeleteMatchModel): Promise<MatchModel> {
    try {
      const match = await this.deleteMatchRepository.delete(deleteMatch)
      return match
    } catch (error) {
      throw error
    }
  }
}
