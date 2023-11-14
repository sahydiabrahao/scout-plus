import { type JsonResponse } from '@/domain/protocols/json-response'

export interface Facade {
  handle: (params: any) => Promise<JsonResponse>
}
