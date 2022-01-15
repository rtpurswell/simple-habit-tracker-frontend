function LeftRightArrow(props) {
  const { direction, color = 'rgb(144, 144, 144)', className } = props
  let tipCoordinate
  if (direction === 'left') tipCoordinate = '0'
  else tipCoordinate = '500'

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon
        style={{ fill: color }}
        points={`${tipCoordinate} 250 250 0 250 500`}
      />
    </svg>
  )
}

export default LeftRightArrow
