function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent) * 90
  const y = Math.sin(2 * Math.PI * percent) * 90

  return { x, y }
}
let currentPercent = 0
for (let i = 0; i < 12; i++) {
  console.log(getCoordinatesForPercent(currentPercent / 100), currentPercent)
  currentPercent += 8.33
}
