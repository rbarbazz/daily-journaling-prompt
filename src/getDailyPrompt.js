const { mkdirSync, readFileSync, writeFileSync } = require('fs')
const path = require('path')

const NEXT_PROMPTS_FILE_PATH = 'next-prompts.txt'

/**
 * @param {string} pathToFile
 * @returns {string[]}
 */
const getPromptsFromFile = (pathToFile) => {
  let prompts = []

  try {
    prompts = readFileSync(path.join(__dirname, pathToFile), 'utf8')
      .split('\n')
      .filter(Boolean)
  } catch (error) {
    // File doesn't exist
  }

  return prompts
}

// Load the remaining prompts
let nextPrompts = getPromptsFromFile(NEXT_PROMPTS_FILE_PATH)

// If no more prompts, load the initial list
if (!nextPrompts.length) {
  const initialPrompts = getPromptsFromFile('initial-prompts.txt')

  nextPrompts = [...initialPrompts]
}

// Select a prompt
const randomPromptIndex = Math.floor(Math.random() * nextPrompts.length)
const randomPrompt = nextPrompts[randomPromptIndex]

// Update the next prompts list
const updatedNextPrompts = [...nextPrompts]

updatedNextPrompts.splice(randomPromptIndex, 1)
console.log('New next prompts size:', updatedNextPrompts.length)
writeFileSync(
  path.join(__dirname, NEXT_PROMPTS_FILE_PATH),
  updatedNextPrompts.join('\n'),
  'utf8',
)

const htmlString = readFileSync(
  path.join(__dirname, '../dist/index.html'),
  'utf8',
)
const modifiedHtmlString = htmlString.replace(
  '{{ DAILY_PROMPT }}',
  randomPrompt,
)

mkdirSync(path.join(__dirname, '../dist'), { recursive: true })
writeFileSync(
  path.join(__dirname, '../dist/index.html'),
  modifiedHtmlString,
  'utf8',
)
