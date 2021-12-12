import React from 'react'
import { Table, Button, Input } from 'antd'
import FileHelper from '../file-helper'

function CustomTable({
  data,
  columns,
  header,
  addBtnText,
  onAddBtnClick,
  searchPlaceHolder,
  onChange,
  rowSelection,
  onRow,
}) {
  const { Search } = Input
  return (
    <div>
      <div className="flex flex-row justify-between">
        <FileHelper tableData={data} header={header} />
        <Button className="mb-4" onClick={onAddBtnClick}>
          {addBtnText}
        </Button>
        <Search
          allowClear
          placeholder={searchPlaceHolder}
          onChange={onChange}
          className="max-w-xs"
        />
      </div>
      <Table
        className="w-full"
        bordered
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
        onRow={onRow}
      />
    </div>
  )
}

export default CustomTable
