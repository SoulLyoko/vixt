type IntrinsicElements = React.JSX.IntrinsicElements
type TheInputProps = Omit<IntrinsicElements['input'], 'onChange'> & {
  onChange?: (value: string) => void
}
export default function TheInput(props: TheInputProps) {
  return (
    <input
      id="input"
      type="text"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ solid gray-200 rounded dark:gray-700"
      outline="none active:none"
      min-h-8
      m-auto
      {...props}
      onChange={e => props.onChange?.(e.target.value)}
    >
    </input>
  )
}
