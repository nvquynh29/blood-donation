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

const amount = ['250', '350', '450']
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
      case 'time':
        localStorage.setItem(
          'step2',
          JSON.stringify({ ...formLocal, time: value }),
        )

        setFormLocal({ ...formLocal, time: value })

        return
      case 'amount':
        localStorage.setItem(
          'step2',
          JSON.stringify({ ...formLocal, amount: value }),
        )
        setFormLocal({ ...formLocal, amount: value })
        return
      default:
        return
    }

    // const time = e.target.value
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
                  <InputLabel id="time">Khung giờ</InputLabel>
                  <Select
                    labelId="time"
                    label="Khung giờ"
                    name="time"
                    required
                    {...(formLocal.time
                      ? { value: formLocal.time }
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
                  <InputLabel id="amount">Lượng máu</InputLabel>
                  <Select
                    labelId="amount"
                    label="Lượng máu"
                    name="amount"
                    required
                    {...(formLocal.amount
                      ? { value: formLocal.amount }
                      : { value: '' })}
                    displayEmpty
                    variant="standard"
                    className="w-full"
                    onChange={handleChange}
                  >
                    {amount.map((item, index) => (
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
          {!formLocal.amount ? (
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
            <Gifts amount={formLocal.amount} />
          )}
        </div>
      </div>
      {/* <Button type="submit">Submit</Button> */}
    </div>
  )
}

export default index
