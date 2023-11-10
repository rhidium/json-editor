# json-editor

This is a web-based JSON file editor for our Discord bots, but it can be used with any JSON schema. It is only meant to be used locally and is merely intended as a convenient solution for our users and clients that aren't familiar with JSON.

## Using the editor

Install the package: `npm i @rhidium/json-editor`

And start the express app:

`/scripts/json-editor.js`

```js
// CommonJS
const { startJSONEditor } = require('@rhidium/json-editor')
const { readFileSync } = require('fs')
// ESM
import { startJSONEditor } from '@rhidium/json-editor'
import { readFileSync } from 'fs'

const jsonSchema = readFileSync('./config.schema.json', 'utf-8');

startJSONEditor({
  port: 3000,
  dataFilePath: './config.json',
  data: {}, // Default data, if not read from file
  createBackup: true,
  schemaString: jsonSchema
}, {
  // Some additional editor options
  // All native @json-editor/json-editor options are available
  // These are our defaults
  theme: 'bootstrap5',
  iconlib: "fontawesome5",
  disable_collapse: false,
  disable_edit_json: true,
  disable_properties: true,
  no_additional_properties: true,
})
```
