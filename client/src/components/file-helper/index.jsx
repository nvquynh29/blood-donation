import React from 'react'
import { Upload, notification, Button, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { importExcel, exportExcel } from '../../api/file'

function FileHelper({
  tableData,
  header,
  callback,
  mapFields,
  additionalFields,
  disableImport,
}) {
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

  const showAlertModal = (titles) => {
    const titlesStr = titles.join(', ')
    Modal.error({
      title: 'Thêm dữ liệu thất bại',
      content: `File excel cần có ${titles.length} cột là: ${titlesStr}`,
      okText: 'Đã hiểu',
      centered: true,
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

  // pick only header fields to export
  const pick = (obj, keys) => {
    const result = {}
    keys.forEach((key) => {
      const headerKey = header[key]
      const genders = ['male', 'female']
      if (key.includes('date')) {
        if (key === 'end_date') {
          result[headerKey] = moment(obj.start_date)
            .add(obj.duration, 'days')
            .format('DD/MM/YYYY')
        } else {
          result[headerKey] = moment(obj[key]).format('DD/MM/YYYY')
        }
      } else {
        result[headerKey] = obj[key]
      }
      if (typeof obj[key] === 'boolean') {
        if (obj[key]) {
          result[headerKey] = mapFields.truthy
        } else {
          result[headerKey] = mapFields.falsy
        }
      }
      if (
        typeof obj[key] === 'string' &&
        genders.includes(obj[key]?.toLowerCase())
      ) {
        result[headerKey] = mapFields[obj[key]?.toLowerCase()]
      }
    })
    return result
  }

  const toSheetData = (data) => {
    const keys = Object.keys(header)
    const sheetData = data.map((row) => pick(row, keys))
    return sheetData
  }

  const uploadExcel = async (info) => {
    try {
      const file = info.file.originFileObj
      file.fieldname = getFileName(file.name)
      const res = await importExcel(
        info.file,
        header,
        mapFields,
        additionalFields,
      )
      callback([...res.data, ...tableData])
      openNotificationSuccess('Thêm dữ liệu thành công')
    } catch (error) {
      showAlertModal(Object.values(header))
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
  console.log(disableImport)

  return (
    <div className="file-helper">
      <Upload {...props} className={disableImport ? 'hidden' : ''}>
        <Button icon={<UploadOutlined />}>Nhập từ excel</Button>
      </Upload>
      <Button onClick={exportData}>Xuất ra excel</Button>
    </div>
  )
}

export default FileHelper
