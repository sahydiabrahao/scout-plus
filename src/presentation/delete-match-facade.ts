import { type JsonResponse } from '@/domain/protocols/json-response'
import { type Facade } from './protocols/facade'
import { type DeleteMatch } from '@/domain/delete-match'

export class DeleteMatchFacade implements Facade {
  constructor (private readonly deleteMatch: DeleteMatch) {}

  async handle (params: any): Promise<JsonResponse> {
    try {
      const match = await this.deleteMatch.delete(params)
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
