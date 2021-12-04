import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import Gifts from '../list-gift'
import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'

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

const capicity = ['250', '350', '450']
function index() {
  const [formLocal, setFormLocal] = useState({})
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('step2'))
    if (localStorageData) {
      setFormLocal(localStorageData)
    }
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'time-zone':
        console.log(formLocal)
        localStorage.setItem(
          'step2',
          JSON.stringify({ ...formLocal, time_zone: value }),
        )

        setFormLocal({ ...formLocal, time_zone: value })

        return
      case 'capacity':
        console.log(formLocal)
        localStorage.setItem(
          'step2',
          JSON.stringify({ ...formLocal, capacity: value }),
        )
        setFormLocal({ ...formLocal, capacity: value })
        return
      default:
        return
    }

    // const time_zone = e.target.value
  }
  // const handleFormSubmit = (e) => {
  //   e.preventDefault()
  //   const form = Array.from(e.target)
  //   const data = form.map((item) => {
  //     return { name: item.name, value: item.value }
  //   })
  //   console.log(data)
  // }
  return (
    <div className="mb-10">
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
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1 }} variant="standard" className="block">
                  <InputLabel id="time-zone">Khung giờ</InputLabel>
                  <Select
                    labelId="time-zone"
                    label="Khung giờ"
                    name="time-zone"
                    required
                    {...(formLocal.time_zone
                      ? { value: formLocal.time_zone }
                      : { value: '' })}
                    displayEmpty
                    variant="standard"
                    className="w-full"
                    onChange={handleChange}
                  >
                    {times.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1 }} variant="standard" className="block">
                  <InputLabel id="capacity">Lượng máu</InputLabel>
                  <Select
                    labelId="capacity"
                    label="Lượng máu"
                    name="capacity"
                    required
                    {...(formLocal.capacity
                      ? { value: formLocal.capacity }
                      : { value: '' })}
                    displayEmpty
                    variant="standard"
                    className="w-full"
                    onChange={handleChange}
                  >
                    {capicity.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}cc (={item}ml)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <div>
          {!formLocal.capacity ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>Chọn dung tích máu để xem danh sách quà tặng!</span>
              }
            />
          ) : (
            <Gifts capacity={formLocal.capacity} />
          )}
        </div>
      </div>
      {/* <Button type="submit">Submit</Button> */}
    </div>
  )
}

export default index
