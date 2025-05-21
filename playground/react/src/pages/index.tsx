/*
route

meta:
  layout: home
*/

function index() {
  const { savedName } = useUserStore()
  const [name, setName] = useState(savedName)
  const navigate = useNavigate()
  const go = () => name && navigate(`/hi/${encodeURIComponent(name)}`)
  return (
    <div>
      <Icon icon="carbon:campsite" width="36px" m-auto />

      <a href="https://github.com/SoulLyoko/vixt" target="_blank">
        Vixt
      </a>

      <div text-sm op-75>
        {ENV.VITE_APP_NAME}
      </div>

      <div py-4></div>

      <TheInput
        value={name}
        placeholder="What's your name?"
        autoComplete="off"
        onChange={e => setName(e)}
        onKeyDown={e => e.key === 'Enter' && go()}
      />

      <div>
        <button className="btn" text-sm m-3 onClick={() => go()}>
          Go
        </button>
      </div>
    </div>
  )
}

export default index
