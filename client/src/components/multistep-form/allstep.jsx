import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import { Empty } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getEventDonation } from '../../api/donation'
import { getAllEvent, getEventDetail } from '../../api/event'
import DatePicker from '../datepicker'
import Gifts from '../list-gift'
import ProvinceSelector from '../provinceSelector/provinceSelector'

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
function allstep() {
  const [data, setData] = useState([])
  const router = useRouter()
  const [done_date, setDone_date] = useState([])
  const { id } = router.query
  const handleFormSubmit = () => {}
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log({ name, value })
    setData({ ...data, [name]: value })
  }
  const handleChildCallBack = () => {}
  const localStorageData = {}

  useEffect(async () => {
    try {
      const res = await getEventDonation('61a8fd1d907eb0af1e7b5708')
      setData(res.data[0])
      console.log(questions.flat())
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(async () => {
    const res1 = await getEventDetail('61a8fd1d907eb0af1e7b5708')
    console.log(res1.data)
    const startDate = new Date(res1.data.start_date)
    const endDate = new Date(res1.data.start_date)
    endDate.setDate(startDate.getDate() + res1.data.duration - 1)
    const test = [moment(startDate)]
    for (let i = 1; i < res1.data.duration; i++) {
      test.push(moment(test[i - 1]).add(1, 'days'))
    }
    console.log(data)
    console.log(test.map((item) => item.format('DD/MM/YYYY')))
    setDone_date(test.map((item) => item.format('DD/MM/YYYY')))
  }, [])
  useEffect(async () => {
    const res = await getAllEvent()
    console.log(res.data)
  }, [])
  return (
    <div>
      <div className="mb-10 mx-2">
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
                    {...(data.name ? { value: data.name } : { value: '' })}
                    className="mx-4 w-1/3"
                    onChange={handleChange}
                  />
                  <FormControl required>
                    <DatePicker
                      name="date_of_birth"
                      {...(data.date_of_birth
                        ? { value: data.date_of_birth }
                        : { value: '' })}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl component="fieldset" className="mx-4 ">
                    {/* <FormLabel component="legend"> </FormLabel> */}
                    <RadioGroup
                      aria-label="gender"
                      value={data.gender || 'female'}
                      onChange={handleChange}
                      name="gender"
                    >
                      <FormControlLabel
                        value="male"
                        name="gender"
                        control={<Radio />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="female"
                        name="gender"
                        control={<Radio />}
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormControlLabel
                      control={<Checkbox checked={data.foreigner ?? false} />}
                      onChange={() => {
                        setData({
                          ...data,
                          ['foreigner']: !data.foreigner,
                        })
                      }}
                      name="foreigner"
                      label="Người nước ngoài"
                    />
                  </FormControl>
                </div>
                <div>
                  <TextField
                    label="Số CMND/CCCD"
                    name="citizenID"
                    required
                    // type="number"
                    {...(data.citizenID
                      ? { value: data.citizenID }
                      : { value: '' })}
                    variant="standard"
                    className="mx-4 w-1/3"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Nơi cấp"
                    name="uid_place"
                    {...(data.uid_place
                      ? { value: data.uid_place }
                      : { value: '' })}
                    required
                    variant="standard"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Mã thẻ SV/Quân nhân"
                    name="user_role_uid"
                    required
                    {...(data.user_role_uid
                      ? { value: data.user_role_uid }
                      : { value: '' })}
                    variant="standard"
                    className="mx-2 w-1/3"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5">
                  <TextField
                    label="Số Điện thoại*"
                    name="phone"
                    {...(data.phone ? { value: data.phone } : { value: '' })}
                    variant="standard"
                    className="mx-4 w-1/3"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    {...(data.email ? { value: data.email } : { value: '' })}
                    variant="standard"
                    className=" w-1/3"
                    onChange={handleChange}
                  />
                </div>
                <div className=" mt-5 lg:w-1/2 md:w-full">
                  <FormControl
                    sx={{ m: 1 }}
                    variant="standard"
                    className="w-1/3"
                  >
                    <InputLabel id="major">Nghề nghiệp</InputLabel>

                    <Select
                      labelId="major"
                      label="Nghề nghiệp"
                      name="major"
                      displayEmpty
                      {...(data.major ? { value: data.major } : { value: '' })}
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
                      {...(data.class ? { value: data.class } : { value: '' })}
                      variant="standard"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} variant="standard" className="">
                    <TextField
                      label="Nơi công tác"
                      name="work_place"
                      {...(data.work_place
                        ? { value: data.work_place }
                        : { value: '' })}
                      variant="standard"
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
              </Grid>
            </Box>
          </Paper>
          <div className="flex w-full justify-around mt-10">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ProvinceSelector
                  title="Địa chỉ thường trú"
                  localStorageData={data}
                  ProvinceSelectorID={'1'}
                  onChange={handleChildCallBack}
                />
              </Grid>
              <Grid item xs={6}>
                <ProvinceSelector
                  title="Địa chỉ liên lạc"
                  localStorageData={data}
                  ProvinceSelectorID={'2'}
                  onChange={handleChildCallBack}
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </div>

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
                  <FormControl
                    sx={{ m: 1 }}
                    variant="standard"
                    className="block"
                  >
                    <InputLabel id="time">Khung giờ</InputLabel>
                    <Select
                      labelId="time"
                      label="Khung giờ"
                      name="time"
                      required
                      {...(data.time ? { value: data.time } : { value: '' })}
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
                  <FormControl
                    sx={{ m: 1 }}
                    variant="standard"
                    className="block"
                  >
                    <InputLabel id="amount">Lượng máu</InputLabel>
                    <Select
                      labelId="amount"
                      label="Lượng máu"
                      name="amount"
                      required
                      {...(data.amount
                        ? { value: data.amount }
                        : { value: '' })}
                      displayEmpty
                      variant="standard"
                      className="w-full"
                      onChange={handleChange}
                    >
                      {amount.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}ml
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} variant="standard" className="block">
                  <InputLabel id="done_date">Ngày hiến máu </InputLabel>
                  <p>aa{data.done_date}</p>
                  <Select
                    labelId="done_date"
                    label="Ngày hiến "
                    name="done_date"
                    required
                    {...(data.done_date
                      ? {
                          value: data.done_date,
                        }
                      : { value: '' })}
                    displayEmpty
                    variant="standard"
                    className="w-full"
                    onChange={handleChange}
                  >
                    {done_date.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
          </Paper>
          <div>
            {!data.amount ? (
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
              <Gifts amount={data.amount} selectedGift={data.selectGift} />
            )}
          </div>
        </div>
        {/* <Button type="submit">Submit</Button> */}
      </div>
    </div>
  )
}

export default allstep
