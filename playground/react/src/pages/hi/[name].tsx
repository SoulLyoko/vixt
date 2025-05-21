import { Link } from 'react-router'

function hi() {
  const navigate = useNavigate()
  const { savedName, otherNames, setNewName } = useUserStore()
  const params = useParams()
  useEffect(() => setNewName(params.name!), [params.name])

  return (
    <div>
      <div>
        Hi,
        {savedName}
      </div>

      <div text-sm op-75>
        Dynamic route!
      </div>

      {
        otherNames().length
          ? (
              <div text-sm mt-4>
                <div op-75>
                  aka:
                </div>
                {otherNames().map(otherName => (
                  <div key={otherName}>
                    <Link to={`/hi/${otherName}`} replace>
                      {otherName}
                    </Link>
                  </div>
                ))}
              </div>
            )
          : ''
      }

      <button className="btn" text-sm m-3 onClick={() => navigate(-1)}>
        Back
      </button>

      <TheCounter initial={otherNames().length} />
    </div>
  )
}

export default hi
