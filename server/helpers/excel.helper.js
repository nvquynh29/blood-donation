/* eslint-disable camelcase */
import xlsx from 'xlsx'
import path from 'path'
import fs from 'fs'

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

const readExcelFile = async (req, res) => {
  try {
    const { file } = req
    if (file === undefined) {
      return res.status(400).send('Please upload an excel file!')
    }
    const filePath = path.join(path.resolve(), `excel/${file.filename || file.name}`)
    const data = readExcel(filePath)
    fs.unlinkSync(filePath)
    return res.status(200).json(data)
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
      // return res.status(200).json({ file_name: fileName })
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
