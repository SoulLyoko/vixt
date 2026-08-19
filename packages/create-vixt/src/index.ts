import path from 'node:path'
import process from 'node:process'

import { cac } from 'cac'
import fs from 'fs-extra'

import { version } from '../package.json'

const __dirname = import.meta.dirname

const argv = cac().parse()
const projectName = argv.args[0] || 'my-project'
const templateName = argv.options.template || 'monorepo'

const cwd = process.cwd()
// 获取命令执行的目录
const projectPath = path.join(cwd, projectName)
// 获取模板路径
const templatePath = path.join(__dirname, `../template/${templateName}`)

// 未找到模板
if (!fs.existsSync(templatePath)) {
  console.error(`"${templateName}" isn't a valid template. Please confirm the template name.`)
  process.exit(1)
}

// 已存在目录
if (fs.existsSync(projectPath)) {
  console.error(`Directory ${projectName} already exists.`)
  process.exit(1)
}

main()

function main() {
  // 创建项目目录
  fs.mkdirSync(projectPath)

  // 复制模板文件到项目目录
  fs.copySync(templatePath, projectPath)

  // 替换依赖版本
  editPackageJson(projectPath, json => {
    json.name = projectName
    replaceDependenciesVersion(json)
  })

  const packagesPath = path.join(projectPath, 'packages')
  const packages = fs.readdirSync(packagesPath)
  for (const name of packages) {
    const pkgPath = path.join(packagesPath, name)
    editPackageJson(pkgPath, json => {
      json.name = `@${projectName}/${name}`
      replaceDependenciesVersion(json)
    })
    fs.renameSync(path.join(pkgPath, '_tsconfig.json'), path.join(pkgPath, 'tsconfig.json'))
  }

  console.log(`Project ${projectName} created.`)
}

// 编辑package.json
function editPackageJson(destDir: string, fn: (json: any) => any) {
  const packageJsonPath = path.join(destDir, 'package.json')
  const packageJson = fs.readJsonSync(packageJsonPath)
  const result = fn(packageJson) || packageJson
  fs.writeJSONSync(packageJsonPath, result, { spaces: 2 })
}

// 将'workspace:*'改为当前版本
function replaceDependenciesVersion(json: any) {
  Object.entries(json.dependencies).forEach(([key, value]) => {
    if (value === 'workspace:*') {
      json.dependencies[key] = `^${version}`
    }
  })
}
