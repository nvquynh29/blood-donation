import jwt from 'jsonwebtoken'
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

export const verifyToken = (token, secretSignature, options) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, options, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      return resolve(decoded)
    })
  })
