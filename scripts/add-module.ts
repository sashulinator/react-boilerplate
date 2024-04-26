import { green, red } from 'colors'

import * as git from './git'

export async function addModule(pathName: string, remote: string) {
  try {
    const addSubtreeRet = await git.addSubtree(pathName, remote)
    console.log('-----------')
    addSubtreeRet.stderr ? console.log(red(addSubtreeRet.stderr)) : console.log(green(addSubtreeRet.stderr))
    return
  } catch (e) {
    console.log(red(e))
  }
}
