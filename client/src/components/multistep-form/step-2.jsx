import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

const times = [
  '7h30 - 8h30',
  '8h30 - 9h30',
  '9h30 - 10h30',
  '10h30 - 11h30',
  '11h30 - 12h30',
  '12h30 - 13h30',
  '13h30 - 14h30',
  '14h30 - 15h30',
  '15h30 - 16h30',
]
function index() {
  const [formLocal, setFormLocal] = useState([])
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('step-2'))
    if (localStorageData) {
      setFormLocal(localStorageData)
    }
  }, [])
  const handleChange = () => {}
  const handleFormSubmit = (e) => {
    e.preventDefault()

    const form = Array.from(e.target)
    const data = form.map((item) => {
      return { name: item.name, value: item.value }
    })
    console.log(data)
  }
  return (
    <div className="mb-10">
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div>
          <Paper className="w-full px-3">
            <Box sx={{ flexGrow: 1 }} className="p-5 pb-10 flex flex-col">
              <FormControl sx={{ m: 1 }} variant="standard" className="">
                <TextField
                  id="standard-basic"
                  label="Đối tượng"
                  value="Tình nguyện"
                  name="doi_tuong"
                  disabled
                  fullWidth
                  variant="standard"
                  required
                  className="mb-5"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" className="">
                <TextField
                  id="standard-basic"
                  label="Hình thức hiến máu"
                  name="hinh_thuc_hien_mau"
                  disabled
                  value="Toàn phần"
                  fullWidth
                  variant="standard"
                  required
                  className="mb-5"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" className="">
                <InputLabel id="time-zone">Khung giờ</InputLabel>
                <Select
                  labelId="time-zone"
                  label="Khung giờ"
                  name="time-zone"
                  required
                  displayEmpty
                  variant="standard"
                  className="w-full"
                  required
                  // onChange={handleChange}
                >
                  {times.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </div>
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </div>
  )
}

export default index
