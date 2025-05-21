export default function TheCounter(props: { initial: number }) {
  const [count, { inc, dec, reset }] = useCounter(props.initial)
  useEffect(() => reset(), [props.initial])

  return (
    <div>
      <button className="dec btn" text-xs onClick={() => dec()}>
        -
      </button>
      { count }
      <button className="btn inc" text-xs onClick={() => inc()}>
        +
      </button>
    </div>
  )
}
