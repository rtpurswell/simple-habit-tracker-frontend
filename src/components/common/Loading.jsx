function Loading(props) {
  const { r, g, b } = props.color || { r: 212, g: 59, b: 17 }
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full"
    >
      <path
        id="spinner"
        fill={`rgb(${r},${g},${b})`}
        d="M40,72C22.4,72,8,57.6,8,40C8,22.4, 22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2 s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6, 28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 40 40"
          to="360 40 40"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
      <text
        style={{
          fill: `rgb(${r},${g},${b})`,
          fontFamily: 'Arial, sans-serif',
          fontSize: '2.7px',
          whiteSpace: 'pre',
        }}
        transform="matrix(4.025592, 0, 0, 6.091743, -61.21143, -160.480225)"
        x="19.185"
        y="33.957"
      >
        Loading...
      </text>
    </svg>
  )
}

export default Loading
