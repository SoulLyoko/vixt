/** 获取路由参数 */
export function useQuery() {
  const query = reactive<any>({})
  onLoad((options) => {
    Object.assign(query, options)
  })
  return query
}
