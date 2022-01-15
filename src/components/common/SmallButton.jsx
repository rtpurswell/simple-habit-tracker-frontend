function SmallButton(props) {
  const { color, onClick } = props
  let classes = 'font-bold text-center w-full  rounded mx-1 p-1 '
  if (color === 'cancel') {
    classes += 'text-slate-50 bg-red-600'
  }
  if (color === 'confirm') {
    classes += 'text-slate-50 bg-green-500'
  }
  if (color === 'dark') {
    classes += 'text-slate-50 bg-gray-700'
  }
  if (color === 'light') {
    classes += 'bg-slate-50 text-gray-700'
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {props.children}
    </button>
  )
}

export default SmallButton
