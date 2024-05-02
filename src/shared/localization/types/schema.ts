export type SchemaValue = string | { [k: string]: SchemaValue }

export type Schema = {
  namespace: string
  data: { [k: string]: SchemaValue }
}
