import { type MatchModel } from '@/domain/protocols/match-model'

export interface Label {
  goalInsideTheBox: number
  goalOutsideTheBox: number
}

export interface Player {
  name: string
  tshirtNumber: number
  labels: Label[]
}

export interface SaveMatchModel {
  body: {
    date: string
    homeTeamScore: number
    awayTeamScore: number
    players: Player[]
  }
}

export interface SaveMatch {
  save: (saveMatch: SaveMatchModel) => Promise<MatchModel>
}
