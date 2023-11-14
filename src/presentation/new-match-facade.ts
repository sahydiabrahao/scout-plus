import { type JsonResponse } from '@/domain/protocols/json-response'
import { type Facade } from './protocols/facade'
import { type NewMatch } from '@/domain/new-match'

export class NewMatchFacade implements Facade {
  constructor (private readonly newMatch: NewMatch) {}

  async handle (params: any): Promise<JsonResponse> {
    try {
      const match = await this.newMatch.new(params)
      return {
        status: 'Success',
        body: match
      }
    } catch (error) {
      return {
        status: 'Error',
        body: error
      }
    }
  }
}
