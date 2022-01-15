function EditIcon(props) {
  const { color, className, style } = props

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect
        x="45"
        width="410"
        height="410"
        rx="5"
        ry="5"
        style={{
          strokeWidth: '45px',
          fill: 'none',
          stroke: `rgb(${color.r},${color.g},${color.b})`,
        }}
        y="45"
      />

      <rect
        className="rotate-45"
        x="340"
        width="25"
        height="400"
        rx="5"
        ry="5"
        style={{
          fill: `rgb(${color.r},${color.g},${color.b})`,
          strokeWidth: ' 0px',
        }}
        y="-200"
      />
      <rect
        className="-rotate-45"
        x="-20"
        width="25"
        height="400"
        rx="5"
        ry="5"
        style={{
          fill: `rgb(${color.r},${color.g},${color.b})`,
          strokeWidth: ' 0px',
        }}
        y="150"
      />
    </svg>
  )
}

export default EditIcon
