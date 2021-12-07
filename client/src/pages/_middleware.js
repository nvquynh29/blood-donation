import { NextResponse } from 'next/server'
import { verifyToken } from '../utils'

const getPayload = async (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || 'access'
  try {
    const payload = await verifyToken(token, secret, { ignoreExpiration: true })
    return payload
  } catch (error) {
    return Promise.reject(error)
  }
}

const isValidPayload = (payload) => {
  if (payload) {
    return payload._id && payload.role
  }
  return false
}

export async function middleware(req) {
  const token = req.cookies.accessToken
  let payload = {}
  if (token) {
    try {
      payload = await getPayload(token)
    } catch (error) {
      return NextResponse.redirect('/login')
    }
  }
  if (req.url.includes('admin')) {
    if (isValidPayload(payload)) {
      if (req.url.includes(`/${payload.role}`)) {
        return NextResponse.next()
      }
    }
    return NextResponse.redirect('/login')
  }
  if (req.url.includes('/login')) {
    if (isValidPayload(payload)) {
      return NextResponse.redirect(`/${payload.role.toLowerCase()}/dashboard`)
    }
  }
}
