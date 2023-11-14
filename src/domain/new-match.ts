import { type MatchModel } from '@/domain/protocols/match-model'

export interface NewMatchModel {
  body: {
    date: string
    homeTeam: string
    homeTeamShortHand: string
    awayTeam: string
    awayTeamShortHand: string
  }
}

export interface NewMatch {
  new: (newMatch: NewMatchModel) => Promise<MatchModel>
}
