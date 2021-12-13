import express from 'express'
import multer from 'multer'
import * as mime from 'mime-types'
import { GiftController } from '../controllers/GiftController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'
import isSuperAdmin from '../middleware/SuperAdminMiddleware.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    const ext = mime.extension(file.mimetype)
    cb(null, `${new Date().getTime()}.${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})
const giftRouter = express.Router()

giftRouter.get('/', GiftController.getAllGift)
giftRouter.get('/:id', GiftController.getGift)
giftRouter.delete('/:id', [isAuth, isSuperAdmin], GiftController.deleteGift)
giftRouter.post('/', [upload.single('gift_image'), isAuth, isSuperAdmin], GiftController.addGift)
giftRouter.put('/:id', [upload.single('gift_image'), isAuth, isSuperAdmin], GiftController.updateGift)
export default giftRouter
