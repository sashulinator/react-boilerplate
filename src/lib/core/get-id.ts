import { Id } from '../../utils/core/types/id'

/**
 * Часто у нас есть тип `Create<Entity> | Update<Entity>` в котором id не доступен
 */
export function getId(input: unknown): Id | undefined {
  return input?.['id'] as Id
}
