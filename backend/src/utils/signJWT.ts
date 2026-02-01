import jwt from 'jsonwebtoken'

export const signJWT = (userId: string) => {
  return jwt.sign(userId, 'some-secret-key')
}
