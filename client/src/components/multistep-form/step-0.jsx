import { Container, FormControl, Input, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getAllProvinces } from '../../../api/province'
import DatePicker from '../datepicker'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function MultipleSelect() {
  const [date, setDate] = useState(new Date('2014-08-18T21:11:54'))

  const handleDateChange = (newValue) => {
    setDate(newValue)
  }
  const [value, setValue] = useState('')
  const [provinces, setProvinces] = useState([])
  const handleChange = (event) => {
    console.log(event)
    setValue(event.target.value)
  }
  const getAllProvincesData = async () => {
    const res = await getAllProvinces()
    console.log(res.data)
    setProvinces(res.data)
  }
  useEffect(() => {
    getAllProvincesData()
  }, [])

  return (
    <Container>
      <div className=" w-full">
        <FormControl className="!mx-2">
          <TextField
            name="name"
            label="Họ và tên*"
            aria-describedby="component-error-text"
            // helperText="Họ và tên không được để trống"
          />
          {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
        </FormControl>
        <FormControl>
          <DatePicker />
        </FormControl>

        <FormControl className="!flex-row !mt-4">
          <Select
            displayEmpty
            value={value}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
            placeholder="Tỉnh/Thành phố"
            inputProps={{ 'aria-label': 'Without label' }}
            className="mx-4"
          >
            {provinces.map((province) => (
              <MenuItem key={province.code} value={province.code}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Container>
  )
}
