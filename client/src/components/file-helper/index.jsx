import React from 'react'
import { Upload, notification, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { importExcel, exportExcel } from '../../api/file'
import { toISOString } from '../../utils'

function FileHelper({ tableData, header }) {
  const excelFileType = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]
  const openNotificationSuccess = (message) => {
    notification.success({
      type: 'success',
      message,
    })
  }

  const getFileName = (fileNameWithExt) => {
    return fileNameWithExt.slice(0, fileNameWithExt.indexOf('.'))
  }

  const openNotificationError = (message) => {
    notification.error({
      type: 'error',
      message,
    })
  }

  const pick = (obj, keys) => {
    const result = {}
    keys.forEach((key) => {
      if (key.includes('date')) {
        result[header[key]] = moment(obj[key]).format('DD/MM/YYYY')
      } else {
        result[header[key]] = obj[key]
      }
    })
    return result
  }

  const excelToJson = (excelRow, titles) => {
    const result = {}
    titles.forEach((title) => {
      const key = getKeyByValue(header, title)
      if (key.includes('date')) {
        // TODO: validate
        result[key] = toISOString(excelRow[title])
      } else {
        result[key] = excelRow[title]
      }
    })
    return result
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value)
  }

  const toSheetData = (data) => {
    const keys = Object.keys(header)
    const sheetData = data.map((row) => pick(row, keys))
    return sheetData
  }

  const toJsonData = (sheetData) => {
    const titles = Object.values(header)
    const jsonData = sheetData.map((row) => excelToJson(row, titles))
    return jsonData
  }

  const uploadExcel = async (info) => {
    try {
      const file = info.file.originFileObj
      file.fieldname = getFileName(file.name)
      const res = await importExcel(info.file)
      console.log(toJsonData(res.data))
      openNotificationSuccess('Nhập dữ liệu thành công')
    } catch (error) {
      console.log(error)
    }
  }

  const exportData = async () => {
    const data = toSheetData(tableData)
    try {
      await exportExcel(data, 'Data', 'output')
    } catch (error) {
      console.log(error)
    }
  }

  const props = {
    accept:
      '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    beforeUpload: (file) => {
      if (!excelFileType.includes(file.type)) {
        openNotificationError('Vui lòng chọn file excel!')
      }
      return excelFileType.includes(file.type) ? true : Upload.LIST_IGNORE
    },
    onChange: async (info) => {
      if (info.file.status === 'done') {
        await uploadExcel(info)
      }
    },
    showUploadList: false,
  }

  return (
    <div className="file-helper">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Nhập từ excel</Button>
      </Upload>
      <Button onClick={exportData}>Xuất ra excel</Button>
    </div>
  )
}

export default FileHelper
