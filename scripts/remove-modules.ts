import { exec } from 'node:child_process'

import { addModule } from './add-module'
import { iterateModules } from './utils/iterate-modules'

run()

async function run() {
  await iterateModules(async ({ pathName }) => {
    await exec(`rm -rf ${pathName}`)
  })

  await exec(`git add .`)
  await new Promise((resolve) => setTimeout(resolve, 100))
  await exec(`git commit -m 'remove modules'`)
}
