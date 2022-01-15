function SingleRowIcon(props) {
  const {
    className = undefined,
    barColor = 'rgb(248,250,252)',
    bgColor = 'rgb(75,85,99)',
  } = props

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="390" height="390" ry="25" rx="25" fill={bgColor} />
      <rect
        fill={barColor}
        rx="10"
        ry="10"
        width="150"
        height="250"
        x="125"
        y="75"
      />
      {/* <rect
        fill={barColor}
        rx="10"
        ry="10"
        width="50"
        height="250"
        x="250"
        y="75"
      /> */}
    </svg>
  )
}

export default SingleRowIcon
