const fs = require('fs')
const util = require('util')

const readAsync = util.promisify(fs.readFile)

async function init() {
  try {
    const data = await readAsync('./package.json')
    console.log(JSON.parse(data))
  } catch(err) {
    console.log(err)
  }
}
init()