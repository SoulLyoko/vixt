type Property = Record<string, string>
export interface AppHead {
  meta?: Property[]
  link?: Property[]
  style?: Property[]
  script?: Property[]
  title?: Property[]
  noscript?: Property[]
}

export interface AppOptions {
  head?: AppHead
  /**
   * @default /
   */
  baseURL?: string
  /**
   * @default 'app'
   */
  rootId?: string
  /**
   * @default 'div'
   */
  rootTag?: string
  /** inject css files */
  css?: string[]
  /**
   * @default './loading.html'
   */
  loadingTemplate?: string
}
