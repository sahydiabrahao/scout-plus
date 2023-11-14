import { type JsonResponse } from '@/domain/protocols/json-response'
import { type Facade } from './protocols/facade'
import { type SaveMatch } from '@/domain/save-match'

export class SaveMatchFacade implements Facade {
  constructor (private readonly saveMatch: SaveMatch) {}

  async handle (params: any): Promise<JsonResponse> {
    try {
      const match = await this.saveMatch.save(params)
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
