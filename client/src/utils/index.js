// quận cẦu GiẤy => Quận Cầu Giấy
export const normalizeString = (str) => {
  if (str) {
    const words = str.trim().split(/\s+/)
    words = words.map((word) => {
      word = word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    return words.join(' ')
  }
  return str
}
