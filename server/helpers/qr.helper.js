import QRCode from 'qrcode'

const generateQRCode = async (payload) => {
  try {
    const qrCode = await QRCode.toDataURL(payload)
    return qrCode
  } catch (error) {
    console.log(error)
  }
}

const getImgFromQRCode = (qrCode, size) => {
  const img = `<image style="width:${size}px;height:${size}px;" src="${qrCode}" /> `
  return img
}

const qrHelper = {
  generateQRCode,
  getImgFromQRCode,
}

export default qrHelper
