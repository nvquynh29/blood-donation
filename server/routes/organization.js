import express from 'express'
import multer from 'multer'
import * as mime from 'mime-types'
import { OrganizationController } from '../controllers/OrganizationController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'
import isSuperAdmin from '../middleware/SuperAdminMiddleware.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
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

const organizationRouter = express.Router()
organizationRouter.post('/', [upload.single('organization_image'), isAuth, isSuperAdmin], OrganizationController.createOrganization)
organizationRouter.put('/:id', [upload.single('organization_image'), isAuth, isSuperAdmin], OrganizationController.updateOrganization)
organizationRouter.get('/admins', [isAuth, isAdmin], OrganizationController.getAllAdmins)
organizationRouter.get('/is-blood-bank', [isAuth, isAdmin], OrganizationController.isBloodBank)
organizationRouter.get('/admins/:id', OrganizationController.getOrgAdmins)
organizationRouter.get('/dashboard', [isAuth, isAdmin], OrganizationController.getDashboardInfo)
organizationRouter.delete('/:id', [isAuth, isSuperAdmin], OrganizationController.deleteOrganization)

export default organizationRouter
