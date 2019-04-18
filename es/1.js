import { promisify } from 'util'
import { resolve as r } from 'path'
import { readFile, writeFileSync as wfs } from 'fs'
import * as qs from 'querystring'

promisify(readFile)(r(__dirname, '../package.json'))
  .then(JSON.parse)
  .then(data => {
    console.log(data.name)
    wfs(r(__dirname, '../out.js'), JSON.stringify(data.name), 'utf8')
  })


  // 第四阶段 Async await + Promise
const readFileAsync = promisify(readFile)

async function readme(path) {
  const data = await readFileAsync(path, 'utf8')
  console.log(JSON.parse(data).main)
}
readme(r(__dirname, '../package.json'))