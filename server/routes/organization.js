import express from 'express'
import multer from 'multer'
import * as mime from 'mime-types'
import { OrganizationController } from '../controllers/OrganizationController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype)
    cb(null, `${new Date().getTime()}-${req.body.name.replace(/\s/g, '-')}.${ext}`)
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

const organizationRouter = express.Router()
organizationRouter.post('/', upload.single('organization_image'), OrganizationController.createOrganization)
organizationRouter.get('/admins', [isAuth, isAdmin], OrganizationController.getAllAdmins)
organizationRouter.get('/dashboard', [isAuth, isAdmin], OrganizationController.getDashboardInfo)

export default organizationRouter
