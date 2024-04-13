<div align="center">
  <a href="https://rhidium.xyz"><img src="https://github.com/rhidium/core/assets/57721238/e6d25fa1-07cb-4284-a02a-f73fe7ef3878" width="100" alt="logo" /></a>

  ![Font_PNG](https://github.com/rhidium/core/assets/57721238/9ccc5763-8336-4d1e-8187-a738bafdc519)

  <p>
    <a href="https://discord.gg/mirasaki"><img src="https://img.shields.io/discord/793894728847720468?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/@rhidium/json-editor"><img src="https://img.shields.io/npm/v/@rhidium/json-editor.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@rhidium/json-editor"><img src="https://img.shields.io/npm/dt/@rhidium/json-editor.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>

  <p align="center">
    <a href="https://github.com/rhidium/core">Core</a>
    •
    <a href="https://github.com/rhidium/template">Template</a>
    •
    <a href="https://github.com/rhidium/json-editor">JSON Editor</a>
    •
    <a href="https://github.com/rhidium/core">Placeholder</a>
  </p>
</div>

# @rhidium/json-editor

This is a simple, web-based JSON editor for our Discord bots, but it can be used with any JSON schema. It is only meant to be used locally and is merely intended as a convenient solution for our users that aren't familiar with JSON.

When a JSON is saved locally, a backup will be created of the original file (if is exists) before it is created.

## Using the editor

Install the package: `npm i @rhidium/json-editor`

And start the express app:

`scripts/json-editor.js`

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

And start the script: `node scripts/json-editor.js`
