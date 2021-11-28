import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.value || new Date())
  useEffect(() => {
    setValue(props.value)
  }, [props.value])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ngày sinh"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          props.onChange(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
