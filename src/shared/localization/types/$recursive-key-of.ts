export type $RecursiveKeyOf<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends unknown[]
    ? `${TKey}`
    : TObj[TKey] extends Record<string, unknown>
      ? `${TKey}${'.'}${$RecursiveKeyOf<TObj[TKey]>}`
      : `${TKey}`
}[keyof TObj & (string | number)]
