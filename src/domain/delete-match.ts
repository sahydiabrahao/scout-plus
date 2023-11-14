import { type MatchModel } from '@/domain/protocols/match-model'

export interface DeleteMatchModel {
  body: {
    date: string
  }
}

export interface DeleteMatch {
  delete: (deleteMatch: DeleteMatchModel) => Promise<MatchModel>
}
