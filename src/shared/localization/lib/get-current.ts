import { Codes } from '../constants/codes'
import { DEFAULT } from '../constants/default'
import { LOCAL_STORAGE_KEY } from '../constants/local-storage-key'

export function getCurrent(): Codes {
  return (localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT) as Codes
}
