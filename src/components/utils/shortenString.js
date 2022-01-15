const shortenString = (string, length) => {
  if (string.length <= length) return string
  let mutatedString = string.slice(0, length - 3)
  mutatedString += '...'
  return mutatedString
}
export default shortenString
