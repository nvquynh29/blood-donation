/* eslint-disable camelcase */
import xlsx from 'xlsx'
import path from 'path'
import fs from 'fs'
import moment from 'moment'
import mongoose from 'mongoose'

import User from '../models/User.js'
import Gift from '../models/Gift.js'
import Event from '../models/Event.js'
import Organization from '../models/Organization.js'
import RequestBlood from '../models/RequestBlood.js'
import Volunteer from '../models/Volunteer.js'
import Donation from '../models/Donation.js'

const models = {
  event: Event,
  gift: Gift,
  organization: Organization,
  requestBlood: RequestBlood,
  volunteer: Volunteer,
  user: User,
  donation: Donation,
}

const readExcel = (filePath) => {
  let data = []

  if (filePath.endsWith('xls') || filePath.endsWith('xlsx')) {
    const file = xlsx.readFile(filePath)
    if (file) {
      // consider 1 file has 1 sheet
      const sheetData = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
      data = sheetData
    }
  } else {
    throw new Error('File type is not supported!')
  }
  return data
}

function getKeyByValue(object, value) {
  if (typeof object !== 'object') {
    return ''
  }
  return Object.keys(object).find((key) => object[key] === value)
}

const validateColumns = (header, titles) => {
  for (let i = 0; i < titles.length; i += 1) {
    const key = getKeyByValue(header, titles[i])
    if (!key) {
      return false
    }
  }
  return true
}

// Date: DD/MM/YYYY
export const toISOString = (date) => {
  if (date && typeof date === 'string') {
    const dateArr = date.split('/')
    const dateStr = dateArr.reverse().join('-')
    return new Date(dateStr).toISOString()
  }
  return '2000-01-31T17:00:00.000Z'
}

// convert all columns in sheet data to json data
const convertSheetRow = (header, excelRow, titles, map) => {
  const result = {}
  titles.forEach((title) => {
    let key = getKeyByValue(header, title)
    const columnVal = excelRow[title]
    result[key] = columnVal
    if (key.includes('date')) {
      if (key === 'end_date') {
        key = 'duration'
        const startDate = moment(toISOString(excelRow[header.start_date]))
        const endDate = moment(toISOString(columnVal))
        result[key] = endDate.diff(startDate, 'days')
      } else {
        result[key] = toISOString(columnVal)
      }
    } else if (map?.truthy) {
      if (getKeyByValue(map, columnVal) === 'truthy') {
        result[key] = true
      }
      if (getKeyByValue(map, columnVal) === 'falsy') {
        result[key] = false
      }
    } else if (key === 'gender') {
      result[key] = getKeyByValue(map, columnVal)
    }
  })
  return result
}

const excelToJson = (header, excelRow, titles, additional, map) => {
  const result = convertSheetRow(header, excelRow, titles, map)
  const additionalFields = Object.keys(additional)
  for (let i = 0; i < additionalFields.length; i += 1) {
    const field = additionalFields[i]
    if (field !== 'model') {
      result[field] = additional[field]
    }
  }
  return result
}

const toJsonData = (sheetData, header, additional, map) => {
  const titles = Object.values(header)
  const jsonData = sheetData.map((row) => excelToJson(header, row, titles, additional, map))
  return jsonData
}

const readExcelFile = async (req, res) => {
  try {
    const { file } = req
    const { header, additional, map } = JSON.parse(req.body.info)
    if (file === undefined) {
      return res.status(400).send('Please upload an excel file!')
    }
    const filePath = path.join(path.resolve(), `excel/${file.filename || file.name}`)
    const data = readExcel(filePath)
    const titles = Object.keys(data[0])
    const isValidData = validateColumns(header, titles)
    fs.unlinkSync(filePath)
    if (isValidData) {
      if (additional.organization_id) {
        const { _id } = req.user
        const { organization_id } = await User.findOne({ _id })
        additional.organization_id = mongoose.Types.ObjectId(organization_id)
      }
      const importData = toJsonData(data, header, additional, map)
      const model = models[additional.model]
      const docs = await model.insertMany(importData)
      return res.json(docs)
    }
    return res.status(400).json({ message: 'Invalid data sheet' })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

// data: array of objects
const writeExcel = (data, sheetName, fname) => {
  const ws = xlsx.utils.json_to_sheet(data)
  const wb = xlsx.utils.book_new()
  try {
    xlsx.utils.book_append_sheet(wb, ws, sheetName || 'Data')
    const fileName = `${new Date().getTime()}-${fname || 'output'}.xlsx`
    const filePath = path.join(path.resolve(), `excel/${fileName}`)
    xlsx.writeFile(wb, filePath)
    return filePath
  } catch (error) {
    console.log(error)
  }
  return ''
}

const writeExcelFile = async (req, res) => {
  try {
    const { data, sheet_name, file_name } = req.body
    const filePath = writeExcel(data, sheet_name, file_name)
    if (filePath) {
      return res.download(filePath)
    }
    return res.status(500).json({ message: 'unexpected error occur' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const excelHelper = {
  readExcelFile,
  writeExcelFile,
}
