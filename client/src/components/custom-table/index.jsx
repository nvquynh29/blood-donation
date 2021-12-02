import React from 'react'
import { Table, Button, Input } from 'antd'

function CustomTable({ data, columns, addBtnText, onAddBtnClick, searchPlaceHolder, onChange, rowSelection }) {
  const { Search } = Input
  return (
    <div>
      <div className="flex flex-row justify-between">
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
      <Table className="w-full" bordered dataSource={data} columns={columns} 
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default CustomTable
