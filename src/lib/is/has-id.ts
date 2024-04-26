import { Id, has } from '~/utils/core'

export function hasId(input: unknown): input is { id: Id } {
  return !!input && has(input, 'id') && (typeof input.id === 'string' || typeof input.id === 'number')
}
