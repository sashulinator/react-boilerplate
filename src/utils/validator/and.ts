import { ErrorCollection, processFactory } from '.'
import { isEmpty } from '../core/is/empty'
import { isPromise } from './is'
import { LogicalOperator, Meta } from './types'

export const and: LogicalOperator = (...schemas) => {
  return function emitSchemaCollector(input, meta) {
    const promises: Promise<ErrorCollection>[] = []
    const metas: (Meta | undefined)[] = []

    for (let index = 0; index < schemas.length; index += 1) {
      const schema = schemas[index]

      const errors = processFactory(schema, input, meta)

      if (isPromise(errors)) {
        promises.push(errors)
        metas.push(meta)
      } else if (errors && promises.length === 0) {
        return errors
      }
    }

    if (!isEmpty(promises)) {
      return Promise.all(promises).then((res: ErrorCollection[]): ErrorCollection => {
        for (let i = 0; i < res.length; i += 1) {
          const error = res[i]
          if (error) {
            return error
          }
        }
      })
    }
  }
}
