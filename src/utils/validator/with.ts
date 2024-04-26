import { Codable } from '../error'
import { ValidationError } from './errors'
import { Meta, WithAssertion, WithRef, WithValue } from './types'

const handleAssertion = (
  assertion: WithAssertion,
  input: unknown,
  input2: unknown,
  meta: Meta | undefined,
  name?: string
) => {
  try {
    assertion(input, input2, meta)
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error
    }
    if (error instanceof Error) {
      throw new ValidationError({
        inputName: meta?.inputName as string,
        input,
        input2: input2?.toString(),
        inputName2: name as string,
        code: (error as unknown as Codable).code || error.message,
        message: error.message,
        path: meta?.path as string,
      })
    }
  }
}

export const withRef: WithRef = (refName: string, assertion: WithAssertion) => {
  return function emitAssertion(input, meta) {
    const input2 = meta?.inputObject?.[refName]
    handleAssertion(assertion, input, input2, meta, refName)
  }
}

export const withValue: WithValue = (input2, assertion, name) => {
  return function emitAssertion(input, meta) {
    handleAssertion(assertion, input, input2, meta, name)
  }
}
