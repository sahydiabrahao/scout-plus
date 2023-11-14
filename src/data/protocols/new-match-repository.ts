import { type NewMatchModel } from '@/domain/new-match'
import { type MatchModel } from '@/domain/protocols/match-model'

export interface NewMatchRepository {
  new: (newMatch: NewMatchModel) => Promise<MatchModel>
}
