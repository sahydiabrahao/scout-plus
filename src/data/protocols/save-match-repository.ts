import { type MatchModel } from '@/domain/protocols/match-model'
import { type SaveMatchModel } from '@/domain/save-match'

export interface SaveMatchRepository {
  save: (saveMatch: SaveMatchModel) => Promise<MatchModel>
}
