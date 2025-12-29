import alias from './alias'
import app from './app'
import build from './build'
import devServer from './dev-server'
import typescript from './typescript'
import virtualAppConfig from './virtual-app-config'
import virtualCSS from './virtual-css'
import virtualPlugins from './virtual-plugins'
import vite from './vite'

export const virtualModuleIds = {
  css: virtualCSS.getMeta!().name,
  appConfig: virtualAppConfig.getMeta!().name,
  plugins: virtualPlugins.getMeta!().name,
}

export const builtinModules = [vite, alias, app, build, devServer, typescript, virtualAppConfig, virtualCSS, virtualPlugins]
