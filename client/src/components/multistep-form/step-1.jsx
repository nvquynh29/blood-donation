import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Select,
  InputLabel,
} from '@mui/material'
import React, { useEffect, useState, useCallback } from 'react'
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
function index(props) {
  const [isSubmit, setIsSubmit] = useState(false)
  const [childState, setChildState] = useState({})
  const [step1State, setStep1State] = useState({})
  const [localStorageData, setLocalStorageData] = useState({})
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const obj = {}
    const formData = Array.from(e.target)
    formData.forEach((element) => {
      if (element.value) {
        if (element.name === 'gender' && !element.checked) {
          return
        }
        if (element.name === 'foreigner') {
          console.log(element.checked)
          return (obj[element.name] = element.checked)
        }
        if (element.name === '') {
          obj['dob'] = element.value
        }
        if (element.name && element.value) {
          obj[element.name] = element.value
        }
      }
    })
    console.log(obj)
    handleChildCallBack()

    localStorage.setItem('step1', JSON.stringify({ ...obj, ...childState }))
    setStep1State({ ...obj, ...childState })
  }
  const handleChildCallBack = useCallback((data, cb) => {
    setChildState({ ...childState, ...data })
  }, [])
  useEffect(() => {
    props.callback(step1State)
  }, [step1State])

  useEffect(() => {
    if (localStorage.getItem('step1')?.length > 2) {
      const data = JSON.parse(localStorage.getItem('step1'))
      setStep1State(data)
      setLocalStorageData(data)
    }
    return () => {}
  }, [])
  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target
      if (value === 'on') {
        value = true
      }
      setStep1State({ ...step1State, [name]: value })
    } else {
      const value = e
      setStep1State({ ...step1State, ['dob']: value })
    }
  }
  return (
    <div className="mb-10">
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <Paper className="py-10">
          <Box sx={{ flexGrow: 1 }} className="px-5">
            <Grid item xs={12}>
              <div>
                <TextField
                  id="standard-basic"
                  label="Họ và tên"
                  name="name"
                  variant="standard"
                  required
                  {...(step1State.name ? { value: step1State.name } : {})}
                  className="mx-4 w-1/3"
                  onChange={handleChange}
                />
                <FormControl required>
                  <DatePicker
                    name="dob"
                    {...(step1State.dob ? { value: step1State.dob } : {})}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl component="fieldset" className="mx-4 ">
                  {/* <FormLabel component="legend"> </FormLabel> */}
                  <RadioGroup
                    aria-label="gender"
                    value={step1State.gender || 'female'}
                    onChange={handleChange}
                    name="gender"
                  >
                    <FormControlLabel
                      value="female"
                      name="gender"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel value="male" name="gender" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormControlLabel
                    control={<Checkbox checked={step1State.foreigner ?? false} />}
                    onChange={() => {
                      setStep1State({ ...step1State, ['foreigner']: !step1State.foreigner })
                    }}
                    name="foreigner"
                    label="Người nước ngoài"
                  />
                </FormControl>
              </div>
              <div>
                <TextField
                  label="Số CMND/CCCD"
                  name="user_uid"
                  required
                  // type="number"
                  {...(step1State.user_uid ? { value: step1State.user_uid } : {})}
                  variant="standard"
                  className="mx-4 w-1/3"
                  onChange={handleChange}
                />
                <TextField
                  label="Nơi cấp"
                  name="uid_place"
                  {...(step1State.uid_place ? { value: step1State.uid_place } : {})}
                  required
                  variant="standard"
                  onChange={handleChange}
                />
                <TextField
                  label="Mã thẻ SV/Quân nhân"
                  name="user_role_uid"
                  required
                  {...(step1State.user_role_uid ? { value: step1State.user_role_uid } : {})}
                  variant="standard"
                  className="mx-2 w-1/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <TextField
                  label="Số Điện thoại*"
                  name="phone_number"
                  {...(step1State.phone_number ? { value: step1State.phone_number } : {})}
                  variant="standard"
                  className="mx-4 w-1/3"
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="mail"
                  {...(step1State.mail ? { value: step1State.mail } : {})}
                  variant="standard"
                  className=" w-1/3"
                  onChange={handleChange}
                />
              </div>
              <div className=" mt-5 lg:w-1/2 md:w-full">
                <FormControl sx={{ m: 1 }} variant="standard" className="w-1/3">
                  <InputLabel id="major">Nghề nghiệp</InputLabel>

                  <Select
                    labelId="major"
                    label="Nghề nghiệp"
                    name="major"
                    displayEmpty
                    {...(step1State.major ? { value: step1State.major } : { value: '' })}
                    variant="standard"
                    className="w-full"
                    required
                    onChange={handleChange}
                  >
                    {major.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard" className="">
                  <TextField
                    label="Lớp/Phòng"
                    name="class"
                    {...(step1State.class ? { value: step1State.class } : {})}
                    variant="standard"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard" className="">
                  <TextField
                    label="Nơi công tác"
                    name="work_place"
                    {...(step1State.work_place ? { value: step1State.work_place } : {})}
                    variant="standard"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </Grid>
          </Box>
        </Paper>
        <Button type="submit">Submit</Button>
        {/* </form>
      <form> */}
        <div className="flex w-full justify-around mt-10">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProvinceSelector
                title="Địa chỉ thường trú"
                localStorageData={localStorageData}
                ProvinceSelectorID={'1'}
                onChange={handleChildCallBack}
              />
            </Grid>
            <Grid item xs={6}>
              {/* right form */}
              <ProvinceSelector
                title="Địa chỉ liên lạc"
                localStorageData={localStorageData}
                ProvinceSelectorID={'2'}
                onChange={handleChildCallBack}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  )
}

export default index
