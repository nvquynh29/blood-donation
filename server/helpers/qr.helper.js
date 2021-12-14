import QRCode from 'qrcode'

const generateQRCode = async (payload, width = 300) => {
  try {
    const qrCode = await QRCode.toDataURL(payload, { width })
    return qrCode
  } catch (error) {
    console.log(error)
  }
}

const getImgFromQRCode = (qrCode, size) => {
  const style = size ? `style="width:${size}px;height:${size}px;"` : ''
  const img = `<img ${style} src="${qrCode}" /> `
  return img
}

const qrHelper = {
  generateQRCode,
  getImgFromQRCode,
}

export default qrHelper
