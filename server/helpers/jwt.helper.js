import jwt from 'jsonwebtoken'

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const { _id } = user
    jwt.sign({ _id }, secretSignature, { expiresIn: tokenLife }, (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
  })
}

const verifyToken = (token, secretSignature) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      return resolve(decoded)
    })
  })
}

export const jwtHelper = {
  generateToken,
  verifyToken,
}
