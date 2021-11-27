import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from '../datepicker'
import ProvinceSelector from '../provinceSelector/provinceSelector'

const major = [
  'Học sinh - Sinh viên',
  'Cán bộ CNV nhà nước',
  'Kinh doanh',
  'Lao động tự do',
  'Công an',
  'Bộ đội',
  'Nông dân',
  'Công nhân',
  'Khác',
  'Nhân viên',
  'Kỹ sư',
  'Bác sĩ',
  'Giáo viên',
  'Nhân viên Y tế',
  'Nội trợ',
  'Kế toán',
  'Lái xe',
  'Bảo vệ',
  'VIP',
  'N/A',
]
function index() {
  const [provinces, setProvinces] = useState([])

  // function search() {
  //   input = document.getElementById('myInput')
  //   filter = input.value

  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName('td')[1]
  //     if (td) {
  //       txtValue = td.textContent || td.innerText
  //       if (
  //         txtValue
  //           .toUpperCase()
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .replace(/đ/g, 'd')
  //           .replace(/Đ/g, 'D')
  //           .indexOf(filter) > -1
  //       ) {
  //         tr[i].style.display = ''
  //       } else {
  //         tr[i].style.display = 'none'
  //       }
  //     }
  //   }
  // }
  const formatSearch = (text) => {
    return text
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .trim()
  }

  const searchProvinces = (event) => {
    const suggestedProvince = provinces.filter((item) =>
      formatSearch(item.name).includes(formatSearch(event.target.value))
    )

    console.log(suggestedProvince)
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value)
  }

  return (
    <div>
      <Paper className="py-10">
        <Box sx={{ flexGrow: 1 }} className="px-5">
          <Grid item xs={12}>
            <div>
              <TextField
                id="standard-basic"
                label="Họ và tên*"
                variant="standard"
                className="mx-4 w-1/3"
              />
              <FormControl>
                <DatePicker />
              </FormControl>
              <FormControl component="fieldset" className="mx-4 ">
                {/* <FormLabel component="legend"> </FormLabel> */}
                <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group">
                  <FormControlLabel value="female" control={<Radio />} label="Nam" />
                  <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Người nước ngoài" />
              <FormControlLabel control={<Checkbox />} label="Người nước ngoài" />
            </div>
            <div>
              <TextField label="Số CMND/CCCD*" variant="standard" className="mx-4 w-1/3" />
              <TextField label="Nơi cấp" variant="standard" />
              <TextField label="Mã thẻ SV/Quân nhân" variant="standard" className="mx-2 w-1/3" />
            </div>
            <div className="mt-5">
              <TextField label="Số Điện thoại*" variant="standard" className="mx-4 w-1/3" />
              <TextField label="Email" variant="standard" className=" w-1/3" />
            </div>
            <div className=" mt-5 lg:w-1/2 md:w-full">
              <FormControl sx={{ m: 1 }} variant="standard" className="w-1/3">
                <TextField
                  select
                  label="Nghề nghiệp"
                  onChange={handleCurrencyChange}
                  // helperText="Please select your currency"
                  variant="standard"
                  className="w-full"
                >
                  {major.map((option, index) => (
                    <MenuItem key={index} value={index}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" className="">
                <TextField label="Lớp/Phòng" variant="standard" />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" className="">
                <TextField label="Nơi công tác" variant="standard" />
              </FormControl>
            </div>
          </Grid>
        </Box>
      </Paper>
      <div className="flex w-full justify-around mt-10">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ProvinceSelector />
          </Grid>
          <Grid item xs={6}>
            {/* right form */}
            <ProvinceSelector />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default index
