/* eslint-disable no-useless-catch */
import { type NewMatch, type NewMatchModel } from '@/domain/new-match'
import { type NewMatchRepository } from '@/data/protocols/new-match-repository'
import { type MatchModel } from '@/domain/protocols/match-model'

export class DbNewMatch implements NewMatch {
  constructor (private readonly newMatchRepository: NewMatchRepository) {}

  async new (newMatch: NewMatchModel): Promise<MatchModel> {
    try {
      const match = await this.newMatchRepository.new(newMatch)
      return match
    } catch (error) {
      throw error
    }
  }
}
