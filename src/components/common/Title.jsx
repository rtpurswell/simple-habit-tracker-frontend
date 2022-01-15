function Title(props) {
  const { className } = props
  return (
    <h1
      className={`text-3xl self-center my-3 text-center ${
        className ? className : ''
      }`}
    >
      {props.children}
    </h1>
  )
}

export default Title
