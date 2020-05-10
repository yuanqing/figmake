import * as fs from 'fs-extra'
import * as path from 'path'
import { test } from 'tap'

import { buildAsync } from '../src/build-async'

test('Exits without a `main.js`', async function (t) {
  t.plan(3)
  process.chdir(path.join(__dirname, 'fixtures', '1-empty'))
  await fs.remove('build')
  t.false(await fs.pathExists('build'))
  try {
    await buildAsync(true)
  } catch (error) {
    t.true(/Need a main.js/.test(error.message))
    t.false(await fs.pathExists('build'))
  }
})

test('Creates a `build/main.js` only', async function (t) {
  t.plan(3)
  process.chdir(path.join(__dirname, 'fixtures', '2-main-only'))
  await fs.remove('build')
  t.false(await fs.pathExists('build'))
  await buildAsync(true)
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.html'))
})

test('Creates both a `build/main.js` and `build/ui.html`', async function (t) {
  t.plan(6)
  process.chdir(path.join(__dirname, 'fixtures', '3-with-ui'))
  await fs.remove('build')
  t.false(await fs.pathExists('build'))
  await buildAsync(true)
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.html'))
  const uiHtml = await fs.readFile('build/ui.html', 'utf8')
  t.true(/font-family:"Inter"/.test(uiHtml))
  t.true(/<h1>Hello, World<\/h1>/.test(uiHtml))
  t.true(/console.log\("Hello, World"\)/.test(uiHtml))
})

test('Inlines images into `build/ui.html`', async function (t) {
  t.plan(5)
  process.chdir(path.join(__dirname, 'fixtures', '4-with-images'))
  await fs.remove('build')
  t.false(await fs.pathExists('build'))
  await buildAsync(true)
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.html'))
  const uiHtml = await fs.readFile('build/ui.html', 'utf8')
  t.true(/background-image:url\("data:image\/png[^"]+"\)/.test(uiHtml))
  t.true(/<img src="data:image\/png[^"]+">/.test(uiHtml))
})
