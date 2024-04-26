import path from 'path'

import { iterateLines } from './iterate-lines'

type Module = { pathName: string; remote: string; repo: string }

const MODULE_FILE_PATH = '../../modules'

export async function iterateModules(cb: (module: Module) => Promise<void>) {
  return iterateLines(path.join(__dirname, MODULE_FILE_PATH), async (line) => {
    const parts = line.split(' ').filter((part) => part !== '')
    const [pathName, remote, repo] = parts

    if (parts.length !== 3 || !pathName || !remote || !repo) return

    return cb({ pathName, remote, repo })
  })
}
