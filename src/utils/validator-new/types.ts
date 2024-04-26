export interface Meta {
  inputObject?: Record<string, unknown> | undefined
  // TODO: required
  initialInput?: unknown | undefined
  // TODO: undefined
  name: string | number
  input: unknown
  path: (string | number)[]
}

export interface Context<EC, VE> extends ISAV<EC, VE> {
  errorCollection: EC
  payload?: any
  isErrorCollectionAllowed: boolean
}

export interface ISAV<EC, VE> {
  getInitialErrorCollection: () => EC
  collectError: (validationError: VE, ctx: Context<EC, VE>, meta: Meta) => void
  createError: (error: unknown, meta: Meta, ctx: Context<EC, VE>) => VE
  assertArray: (input: unknown, meta: Meta, context: Context<EC, VE>) => asserts input is unknown[]
  assertRequired: <T>(input: T | undefined, meta: Meta, context: Context<EC, VE>) => asserts input is T
  assertObject: (input: unknown, meta: Meta, context: Context<EC, VE>) => asserts input is Record<string, unknown>
  assertEqual: <T>(input: unknown, compare: T, meta: Meta, context: Context<EC, VE>) => asserts input is T
}
