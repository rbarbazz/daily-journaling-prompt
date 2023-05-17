const { mkdirSync, readFileSync, writeFileSync } = require('fs')
const path = require('path')

const prompts = readFileSync(path.join(__dirname, 'prompts.txt'), 'utf8')
  .split('\n')
  .filter(Boolean)
const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]

const htmlString = readFileSync(path.join(__dirname, 'index.html'), 'utf8')
const modifiedHtmlString = htmlString.replace(
  '{{ DAILY_PROMPT }}',
  randomPrompt,
)

mkdirSync(path.join(__dirname, '../public'), { recursive: true })
writeFileSync(
  path.join(__dirname, '../public/index.html'),
  modifiedHtmlString,
  'utf8',
)
