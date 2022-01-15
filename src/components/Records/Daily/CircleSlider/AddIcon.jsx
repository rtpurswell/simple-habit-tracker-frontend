function AddIcon(props) {
  const { className } = props

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`w-full  -rotate-90 rounded-full ${className}`}
    >
      <path
        d="M -20 85 L 20 85 L 20 20 L 85 20 L 85 -20 L 20 -20 L 20 -85 L -20 -85 L -20 -20 L -85 -20 L -85 20 L -20 20 L -20 85"
        stroke="rgba(112,182,208,0.3)"
        strokeWidth="5"
        fill="none"
      ></path>
    </svg>
  )
}

export default AddIcon
