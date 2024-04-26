import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { ClientError, GraphQLClient, RequestDocument, Variables } from 'graphql-request'
import { VariablesAndRequestHeadersArgs } from 'graphql-request/build/esm/types'

import { omit } from '~/utils/dictionary'
import { BaseError } from '~/utils/error'

// TODO: endpoint поместить в отдельный общий файл
const endpoint = '/graphql'

// TODO: headers поместить в отдельный общий файл
const headers = {
  headers: {},
}

export const graphQLClient = new GraphQLClient(endpoint, headers)

/**
 * Обертка над graphQLClient.request
 *
 * Так как мы вызываем эту функцию часто через react-query, то последняя
 * реагируя на наличие в error.response поля data начинает пробрасывать
 * ошибку дальше, тем самым роняя страницу
 */
export async function requestQL<T, V extends Variables = Variables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
): Promise<T> {
  // prettier-ignore
  return graphQLClient.request<T, V>(document, ...variablesAndRequestHeaders)
  .catch((e: ClientError) => {
    throw new BaseError(e.message, {
      request: { ...e.request },
      response: omit(e.response, 'data'),
    })
  })
}
