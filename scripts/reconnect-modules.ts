import { green, red } from 'colors'

import { addModule } from './add-module'
import { removeModule } from './remove-module'
import { iterateModules } from './utils/iterate-modules'

run()

async function run() {
  await iterateModules(async ({ pathName }) => {
    await removeModule(pathName)
  })

  iterateModules(async ({ pathName, remote }) => {
    await addModule(pathName, remote)
  })
}
