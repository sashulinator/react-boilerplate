import { buildErrorTree, only, wrap } from '~/utils/validator'

const rootOnly = only.bind({ handleError: buildErrorTree })
const rootWrap = wrap.bind({ handleError: buildErrorTree })

export { rootOnly as only }
export { rootWrap as wrap }
