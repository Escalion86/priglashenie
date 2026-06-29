const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const appsScript = fs.readFileSync(
  path.join(root, 'google_apps_script.js'),
  'utf8',
)

assert.match(
  html,
  /<input[\s\S]*type="tel"[\s\S]*name="phone"/,
  'RSVP form should include a phone input',
)

assert.match(
  html,
  /phone:\s*formData\.get\('phone'\)/,
  'RSVP submission payload should include the phone value',
)

assert.match(
  appsScript,
  /'Телефон гостя'[\s\S]*data\.phone \|\| ''/,
  'Google Apps Script should save the phone value to the sheet',
)

console.log('RSVP phone field checks passed')
