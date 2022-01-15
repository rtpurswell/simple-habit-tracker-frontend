function Button(props) {
  const { color, onClick, disabled = false, className } = props
  let classes =
    'border-b-4 text-center py-2 px-4 rounded w-full font-bold text-white md:hover:text-black md:hover:border-gray-400 md:hover:bg-gray-100 '
  if (className) classes = classes + className
  if (color === 'primary') {
    classes = classes + ' bg-orange-400 border-orange-800'
  } else if (color === 'secondary') {
    classes = classes + ' bg-blue-500'
  } else if (color === 'confirm') {
    classes = classes + ' bg-green-500 border-green-800'
  } else if (color === 'cancel') {
    classes = classes + ' bg-red-600 border-red-800'
  } else {
    classes = classes + ` ${color}`
  }
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  )
}

export default Button
