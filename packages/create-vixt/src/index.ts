import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { cac } from 'cac'
import fs from 'fs-extra'

import { version } from '../package.json'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const argv = cac().parse()
const projectName = argv.args[0] || 'vixt-project'
const templateName = argv.options.template || 'monorepo-ts'

const cwd = process.cwd()

// 获取命令执行的目录
const projectPath = path.join(cwd, projectName)
// 获取模板路径
const templatePath = path.join(__dirname, `../template-${templateName}`)

if (!fs.existsSync(templatePath)) {
  console.error(`"${templateName}" isn\'t a valid template. Please confirm the template name.`)
  process.exit(1)
}

// 创建项目目录
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath)
  console.log(`Project directory ${projectName} created.`)
}
else {
  console.error(`Directory ${projectName} already exists.`)
  process.exit(1)
}

function editPackageJson(destDir: string, fn: (json: any) => any) {
  const packageJsonPath = path.join(destDir, 'package.json')
  const packageJson = fs.readJsonSync(packageJsonPath)
  const result = fn(packageJson) || packageJson
  fs.writeJSONSync(packageJsonPath, result, { spaces: 2 })
}

// 复制模板文件到项目目录
function copyTemplateFiles(srcDir: string, destDir: string) {
  fs.copySync(srcDir, destDir)
  editPackageJson(destDir, (json) => {
    json.name = projectName
    json.dependencies.vixt = `^${version}`
  })
}

copyTemplateFiles(templatePath, projectPath)

if (templateName === 'monorepo-ts') {
  const vueTemplatePath = path.join(__dirname, `../template-vue-ts`)
  const vueProjectPath = path.join(projectPath, 'packages/vue')
  fs.copySync(vueTemplatePath, vueProjectPath)
  editPackageJson(vueProjectPath, (json) => {
    delete json.dependencies.vixt
  })

  const uniTemplatePath = path.join(__dirname, `../template-uni-ts`)
  const uniProjectPath = path.join(projectPath, 'packages/uni')
  fs.copySync(uniTemplatePath, uniProjectPath)
  editPackageJson(uniProjectPath, (json) => {
    delete json.dependencies.vixt
  })
}

console.log('Template project initialized.')
