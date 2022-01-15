function TextInput(props) {
  const { className, onChange, value, placeholder, name, id, onBlur } = props
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`rounded p-1 font-bold text-black ${className}`}
    />
  )
}

export default TextInput
