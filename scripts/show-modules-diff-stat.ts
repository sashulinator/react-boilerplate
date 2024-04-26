import fs from 'fs'
import path from 'path'
import readline from 'readline'
import util from 'util'

const exec = util.promisify(require('child_process').exec)

const MODULE_FILE_PATH = '../modules'

run()

async function run() {
  processLineByLine(path.join(__dirname, MODULE_FILE_PATH), async (line) => {
    const [pathName, remote] = line.split(' ').filter((part) => part !== '')

    exec(`git fetch ${remote} master`).then(async (fetchRet) => {
      const currentBranch = (await exec(`git branch --show-current`)).stdout.trim()

      exec(`git --no-pager diff --stat "${remote}/master" "${currentBranch}:${pathName}"`).then((diffRet) => {
        // Если изменений нет то команда ничего не выдаст

        if (fetchRet.stdout) console.log(fetchRet.stdout)

        if (diffRet.stdout) {
          console.log(`"${remote}" has changes`)
          console.log('to see details:')
          console.log(`git --no-pager diff --stat "${remote}/master" "${currentBranch}:${pathName}"`)
          console.log('to push:')
          console.log(`git subtree push --prefix=${pathName} ${remote} master`)
          console.log('force push:')
          console.log(`git push ${remote} \`git subtree split --prefix=${pathName} @\`:master --force`)
          console.log('------')
        }
      })
    })
  })
}

/**
 * Private
 */

async function processLineByLine(filePath: string, cb: (line: string) => void) {
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })
  for await (const line of rl) cb(line)
}
