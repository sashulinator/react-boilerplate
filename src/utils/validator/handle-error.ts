import { Meta, ValidationError, isObject } from '.'
import { buildObjectByPath } from './lib/build-object-from-path'

export const buildErrorArray = (
  errors: ValidationError[] = [],
  validationErrorOrErrors?: ValidationError | ValidationError[]
): ValidationError[] => {
  if (validationErrorOrErrors instanceof ValidationError) {
    errors.push(validationErrorOrErrors)
  } else if (Array.isArray(validationErrorOrErrors)) {
    return [...errors, ...validationErrorOrErrors]
  }

  return errors
}

export const buildErrorTree = (
  errors: Record<string, unknown> = {},
  validationErrorOrErrors: Record<string, unknown> | ValidationError,
  meta?: Meta
): Record<string, unknown> => {
  if (meta?.path === '') {
    return Object.assign(errors, validationErrorOrErrors)
  }

  if (validationErrorOrErrors instanceof ValidationError) {
    buildObjectByPath(errors, meta?.path as string, {
      code: validationErrorOrErrors.code,
      message: validationErrorOrErrors.message,
      path: validationErrorOrErrors.path,
      input: validationErrorOrErrors.input,
      inputName: validationErrorOrErrors.inputName,
      input2: validationErrorOrErrors.input2,
      inputName2: validationErrorOrErrors.inputName2,
    })
  } else if (isObject(validationErrorOrErrors)) {
    errors = Object.assign(errors, validationErrorOrErrors)
  }

  return errors
}
