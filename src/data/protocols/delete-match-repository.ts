import { type DeleteMatchModel } from '@/domain/delete-match'
import { type MatchModel } from '@/domain/protocols/match-model'

export interface DeleteMatchRepository {
  delete: (deleteMatch: DeleteMatchModel) => Promise<MatchModel>
}
