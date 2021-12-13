import React, { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import FileHelper from '../file-helper'

function CustomTable({
  data,
  columns,
  header,
  mapFields,
  disableExcel,
  disableImport,
  additionalFields,
  addBtnText,
  onAddBtnClick,
  searchPlaceHolder,
  onChange,
  rowSelection,
  onRow,
}) {
  const { Search } = Input
  const [dataSource, setDataSource] = useState(data)

  useEffect(() => {
    setDataSource(data)
  }, [data])

  const callback = (data) => {
    setDataSource(data)
  }

  return (
    <div className='customTable'>
      <div className="flex flex-row justify-between">
        {disableExcel ? null : (
          <FileHelper
            tableData={data}
            header={header}
            callback={callback}
            mapFields={mapFields}
            additionalFields={additionalFields}
            disableImport={disableImport}
          />
        )}
        <Button className="mb-4" onClick={onAddBtnClick}>
          {addBtnText}
        </Button>
        <Search
          allowClear
          placeholder={searchPlaceHolder}
          onChange={onChange}
          className="max-w-xs !p-0 !m-0"
        />
      </div>
      <Table
        className="w-full"
        bordered
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        onRow={onRow}
      />
    </div>
  )
}

export default CustomTable
