import express from 'express'
import multer from 'multer'
import path from 'path'
import * as mime from 'mime-types'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'
import { excelHelper } from '../helpers/excel.helper.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), '/excel/'))
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  },
})

const excelFilter = (req, file, cb) => {
  if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
    cb(null, true)
  } else {
    cb('Please upload only excel file.', false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: excelFilter,
})

const excelRouter = express.Router()
excelRouter.post('/', [upload.single('file'), isAuth, isAdmin], excelHelper.readExcelFile)
excelRouter.post('/export', [isAuth, isAdmin], excelHelper.writeExcelFile)

export default excelRouter
