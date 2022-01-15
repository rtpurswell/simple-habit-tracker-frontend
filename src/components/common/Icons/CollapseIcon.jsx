function CollapseIcon(props) {
  const {
    color = { r: 248, g: 250, b: 252 },
    className,
    style,
    bgColor = { r: 75, g: 85, b: 99 },
  } = props

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect
        width="490"
        height="490"
        ry="25"
        rx="25"
        fill={`rgb(${bgColor.r},${bgColor.g},${bgColor.b})`}
        x="5"
        y="5"
      />

      <polygon
        style={{ fill: `rgb(${color.r},${color.g},${color.b})` }}
        points="250 15 450 200 270 200 270 400 230 400 230 200 50 200"
      />
      <rect
        x="10"
        y="420"
        width="480"
        height="45"
        rx="5"
        ry="5"
        style={{ fill: `rgb(${color.r},${color.g},${color.b})` }}
      />
    </svg>
  )
}

export default CollapseIcon
