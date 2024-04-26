import { Meta, ValidationError, isPrimitive } from '.'
import { Codable } from '../error'

export function catchError(error: Error, input: unknown, meta: Meta | undefined): any {
  // assertion can be withValue or withRef and they throw their own ValidationError
  if (error instanceof ValidationError) {
    return error
  }
  if (error instanceof Error) {
    return new ValidationError({
      inputName: meta?.inputName as string,
      input: isPrimitive(input) ? input : input?.toString(),
      code: (error as unknown as Codable).code || error.message,
      message: error.message,
      path: meta?.path as string,
    })
  }
}
