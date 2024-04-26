import SuperAwesomeValidator, { ValidationError, collectError, createError } from '~/utils/validator-new'

export const s = new SuperAwesomeValidator<ValidationError[], ValidationError>({
  createError,
  collectError,
})
