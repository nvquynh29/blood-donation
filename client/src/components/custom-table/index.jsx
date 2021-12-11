import React from 'react'
import { Table, Button, Input } from 'antd'

function CustomTable({
  data,
  columns,
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
      <div className="flex mb-5 flex-row justify-between items-center w-full">
        <Button onClick={onAddBtnClick}>{addBtnText}</Button>
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
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
        onRow={onRow}
      />
    </div>
  )
}

export default CustomTable
