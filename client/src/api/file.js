import instance from './axios'

export const importExcel = (file) => {
  const fd = new FormData()
  fd.append('file', file.originFileObj)
  return instance.post('/excel', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const exportExcel = (data, sheet_name, file_name) =>
  instance({
    url: '/excel/export',
    method: 'POST',
    data: { data, sheet_name, file_name },
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'output.xlsx') //or any other extension
    document.body.appendChild(link)
    link.click()
  })
