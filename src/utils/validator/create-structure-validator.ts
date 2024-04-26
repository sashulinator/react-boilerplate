import { StructureAssertion, isObject } from '.'
import createStructureValidatorEmitter from './create-structure-validator-emitter'
import passContextToEmitter from './lib/wrap-simple-assertion'
import { ErrorCollector, Schema } from './types'

export function createStructureValidator<TErrors>(structureAssertion?: StructureAssertion) {
  return function structureValidator<TSchema extends Schema<any>>(schema: TSchema): TSchema & ErrorCollector<TErrors> {
    const newSchema = isObject(schema) ? {} : (schema as any)

    // @ts-ignore
    const structureValidatorEmitter = createStructureValidatorEmitter(newSchema, structureAssertion, this?.handleError)

    if (isObject(schema)) {
      Object.entries(schema).forEach(([schemaKey, schemaValue]) => {
        // @ts-ignore
        newSchema[schemaKey] = passContextToEmitter(this, schemaValue, schemaKey, structureValidatorEmitter)

        Object.defineProperty(structureValidatorEmitter, schemaKey, {
          value: newSchema[schemaKey],
          writable: true,
          enumerable: true,
        })
      })
    }

    return structureValidatorEmitter as TSchema & ErrorCollector<TErrors>
  }
}
