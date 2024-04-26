import { exec } from 'node:child_process'

import { addModule } from './add-module'
import { iterateModules } from './utils/iterate-modules'

run()

async function run() {
  iterateModules(async ({ pathName, remote }) => {
    await addModule(pathName, remote)
  })
}
