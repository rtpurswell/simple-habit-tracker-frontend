function AddIcon(props) {
  const { r, g, b } = props.color || { r: 255, g: 255, b: 255 }
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g style={{ fill: `rgb(${r}, ${g},${b})` }}>
        <rect x="175" y="25" width="50" height="350" rx="5" ry="5" />
        <rect
          x="125"
          y="25"
          width="50"
          height="350"
          rx="5"
          ry="5"
          transform="matrix(0, -1, 1, 0, -0, 350)"
        />
      </g>
    </svg>
  )
}

export default AddIcon
