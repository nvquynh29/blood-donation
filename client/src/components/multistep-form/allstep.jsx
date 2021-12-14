import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
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
  Button,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Empty, notification, Select as AntSelect } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getDonation, updateDonation } from '../../api/donation'
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
const bloodType = ['A', 'B', 'AB', 'O']
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

const initialQuestions = [
  {
    title: 'Trước đây bạn đã từng hiến máu chưa?',
    answer: null,
  },
  {
    title:
      'Quý vị đã từng mắc các bệnh  như  thần kinh, hô hấp, vàng da/viêm gan, tim mạch, huyết áp thấp/cao, bệnh thận, ho kéo dài, bệnh máu,  lao, ung thư,v.v??',
    answer: null,
  },
  {
    title: 'Trong vòng 6 tháng gần đây, Quí vị có:',
    answer: null,
    subquestion: [
      {
        title: 'Sút cân >= 4kg không rõ nguyên nhân? Nổi hạch kéo dài?',
        answer: null,
      },
      {
        title: 'Phẫu thuật?',
        answer: null,
      },
      {
        title: 'Xăm hình, xỏ lỗ tai, xỏ lỗ mũi,châm cứu?',
        answer: null,
      },
      {
        title: 'Được truyền máu, chế phẩm máu?',
        answer: null,
      },
      {
        title: 'Sử dụng ma túy, tiêm chích?',
        answer: null,
      },
      {
        title:
          'Quan hệ tình dục với người nhiễm hoặc có nguy cơ nhiễm HIV/AIDS, viêm gan',
        answer: null,
      },
      {
        title:
          'Quan hệ tình dục với nhiều người và/hoặc không có biện pháp an toàn tránh lây nhiễm?',
        answer: null,
      },
      {
        title: 'Tiêm vác xin phòng bệnh?',
        answer: null,
      },
      {
        title:
          'Có liên quan đến/ở vùng có dịch lưu hành(sốt xuất huyết, sốt rét, bò điên,...?',
        answer: null,
      },
    ],
  },
  {
    title: 'Trong vòng 1 tuần gần đây, Quí vị có:',
    answer: null,
    subquestion: [
      {
        title: 'Bị cúm, ho, nhức đầu, sốt?',
        answer: null,
      },
      {
        title: 'Dùng thuốc khác sinh, Aspirin, Corticoid?',
        answer: null,
      },
      {
        title: 'Xăm hình, xỏ lỗ tai, xỏ lỗ mũi,châm cứu?',
        answer: null,
      },
      {
        title: 'Đi khám sức khỏe, làm xét nghiệm, chữa răng?',
        answer: null,
      },
    ],
  },
  {
    title:
      ' Quý vị hiện là đối tượng tàn tật hoặc hưởng trợ cấp tàn tật hoặc nạn nhân chất độc màu da cam không?',
    answer: null,
  },
]
const { Option } = AntSelect

function AllStepForm(props) {
  const [data, setData] = useState([])
  const router = useRouter()
  const [done_date, setDone_date] = useState([])
  const [childState, setChildState] = useState({})
  const [questions, setQuestions] = useState(initialQuestions)
  const [disable, setDisable] = useState(true)
  const [bloodData, setBloodData] = useState('')
  const [isDone, setIsDone] = useState('false')
  const [ans, setAns] = useState({})
  const handleFormSubmit = () => {}
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const handleChildCallBack = (data) => {
    setChildState({ ...childState, data })
    // setData({ ...data, childState })
  }
  const onChecked = (e) => {
    const { name, value } = e.target

    const rep = ans.find((item) => item.title === name)
    setAns([
      ...ans.filter((item) => item.title !== name),
      {
        title: name,
        answer: value === 'true',
      },
    ])
  }
  const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  // isDone === true && done_date < 7 khong co nut edit: co nut edit
  useEffect(() => {}, [ans])
  const setAnswer = (list_answer) => {
    const flat_questions = questions.reduce((acc, cur) => {
      acc.push(cur)
      if (cur.subquestion) {
        acc.push(...cur.subquestion)
      }
      return acc
    }, [])
    const all = list_answer.map((answer) => {
      const ques = flat_questions.find(
        (question) => question.title === answer[0],
      )
      if (ques) {
        ques.answer = answer[1] === 'true'
      }
      return ques
    })
    setAns(all)
  }
  useEffect(async () => {
    if (!props.donationId) return
    try {
      const res = await getDonation(props.donationId)
      const list_answer = Object.entries(res.data.list_answer)
      setAnswer(list_answer)

      res.data.done_date = moment(res.data.done_date).format('DD/MM/YYYY')

      setData(res.data)
    } catch (error) {}
  }, [props.donationId])

  useEffect(async () => {
    const res1 = await getEventDetail(
      props.eventId || '61a8fd1d907eb0af1e7b5708',
    )
    const startDate = new Date(res1.data.start_date)
    const endDate = new Date(res1.data.start_date)
    endDate.setDate(startDate.getDate() + res1.data.duration - 1)
    const test = [moment(startDate)]
    for (let i = 1; i < res1.data.duration; i++) {
      test.push(moment(test[i - 1]).add(1, 'days'))
    }
    setDone_date(test.map((item) => item.format('DD/MM/YYYY')))
  }, [])
  useEffect(async () => {
    const res = await getAllEvent()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    // return an object from all answer
    const newListAnswer = ans.reduce((acc, cur) => {
      acc[cur.title] = cur.answer
      return acc
    }, {})
    data.list_answer = newListAnswer
    if (bloodData === '' || isDone === '') {
      return notification.error({
        message: 'Thông báo',
        description: 'Vui lòng nhập đầy đủ thông tin',
      })
    }
    const newAddress = childState?.data
    setDisable(!disable)
    await updateDonation(props.donationId, {
      ...data,
      bloodData,
      isDone,
      ...newAddress,
    })
    return notification.success({
      message: 'Thông báo',
      description: 'Cập nhật thành công',
    })
  }
  const handleChangeBlood = async (e) => {
    if (bloodData === '' || isDone === '') {
      return notification.error({
        message: 'Thông báo',
        description: 'Vui lòng chọn nhóm máu',
      })
    }
    await updateDonation(props.donationId, {
      blood_type: bloodData,
      is_done: isDone,
    })
    console.log(bloodData, isDone)
    //  return notification.success({
    //    message: 'Thông báo',
    //    description: 'Cập nhật thành công',
    //  })
    // setBloodData(e.target.value)
  }
  return (
    <div>
      {disable ? (
        <div
          className="sticky z-50 flex items-center justify-center top-[20%] right-10 bg-[#1976d2] rounded-[50%] w-11 h-11 mr-0 ml-auto shadow-lg hover:cursor-pointer "
          onClick={() => {
            setDisable(!disable)
          }}
        >
          <EditIcon />
        </div>
      ) : (
        <div className="flex sticky z-50 gap-4 items-center justify-end top-[20%] right-10 mr-5">
          <div
            className=" flex items-center justify-center text-[#f5f5dc] bg-[#adff2f] rounded-[50%] w-11 h-11  shadow-lg hover:cursor-pointer "
            onClick={handleSubmit}
          >
            <CheckCircleIcon />
          </div>
          <div
            className=" flex items-center justify-center  bg-[#de1515b3] rounded-[50%] w-11 h-11  shadow-lg hover:cursor-pointer "
            onClick={() => {
              setDisable(!disable)
            }}
          >
            <CancelIcon />
          </div>
        </div>
      )}

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
                    disabled={disable}
                    variant="standard"
                    required
                    {...(data.name ? { value: data.name } : { value: '' })}
                    className="mx-4 w-1/3"
                    onChange={handleChange}
                  />
                  <FormControl required>
                    <DatePicker
                      disabled={disable}
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
                        disabled={disable}
                        name="gender"
                        control={<Radio />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="female"
                        disabled={disable}
                        name="gender"
                        control={<Radio />}
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormControlLabel
                      disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
                    name="uid_place"
                    {...(data.uid_place
                      ? { value: data.uid_place }
                      : { value: '' })}
                    required
                    variant="standard"
                    onChange={handleChange}
                  />
                  <TextField
                    disabled={disable}
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
                    disabled={disable}
                    label="Số Điện thoại*"
                    name="phone"
                    {...(data.phone ? { value: data.phone } : { value: '' })}
                    variant="standard"
                    className="mx-4 w-1/3"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Email"
                    disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      label="Lớp/Phòng"
                      name="class"
                      {...(data.class ? { value: data.class } : { value: '' })}
                      variant="standard"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} variant="standard" className="">
                    <TextField
                      disabled={disable}
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
                  disabled={disable}
                  title="Địa chỉ thường trú"
                  localStorageData={data}
                  ProvinceSelectorID={'1'}
                  onChange={handleChildCallBack}
                />
              </Grid>
              <Grid item xs={6}>
                <ProvinceSelector
                  disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                  <Select
                    disabled={disable}
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

      <Paper className="w-full px-3  mx-3">
        <Box sx={{ flexGrow: 1 }} className="p-5 pb-10 flex flex-col ">
          <Typography variant="h4" className="mb-5 font-Dosis">
            Câu hỏi hiến máu
          </Typography>
          <div className="flex items-center">
            XIN QUÝ VỊ VUI LÒNG TÍCH DẤU
            {<CheckOutlined className="text-xl px-2" />} VÀO Ô
            {<CheckCircleOutlined className="text-xl px-2" />}THÍCH HỢP
          </div>
          <Typography variant="p" className="italic my-2 ">
            <span className="text-red-500 font-bold">Chú ý: </span>
            Để đảm bảo an toàn sức khỏe cho quý vị và người bệnh nhận máu, xin
            quý vị trả lời trung thực và chính xác. Nếu có bất cứ nghi ngờ nào
            về nguy cơ mắc bệnh lây truyền, XIN QUÝ VỊ HÃY KHÔNG HIẾN MÁU!
          </Typography>
          <hr className="h-[1px] bg-gray-900" />
          <div className="flex flex-col">
            {questions.map((item, index) => (
              <div key={index + item} className="">
                <Typography
                  variant="h5"
                  className="mb-2 flex text-xl justify-between font-Dosis break-words"
                >
                  <span className="font-bold">
                    <span>{index + 1}.</span> {item.title}
                    {/* {item.subquestion?.length} */}
                  </span>
                  {!item.subquestion || item.subquestion.length < 1 ? (
                    <FormControl required>
                      <RadioGroup
                        name={item.title}
                        required
                        {...(ans[index]
                          ? {
                              value: ans.find((i) => item.title === i.title)
                                ?.answer,
                            }
                          : { value: '' })}
                        style={{ flexDirection: 'row' }}
                        className="flex !flex-row !flex-nowrap"
                      >
                        <Radio
                          disabled={disable}
                          defaultChecked={false}
                          value={true}
                          onChange={onChecked}
                        />
                        <Radio
                          disabled={disable}
                          defaultChecked={false}
                          value={false}
                          onChange={onChecked}
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : null}
                </Typography>

                <div key={index + 1} className="">
                  {item.subquestion?.map((subitem, subindex) => (
                    <div key={subindex + index} className="flex flex-col">
                      <Typography
                        variant="h6"
                        className=" flex justify-between pl-5 text-[18px] font-Dosis"
                      >
                        <span className="font-[400]">
                          <span>{subindex + 1}.</span> {subitem.title}
                        </span>
                        {item.subquestion ? (
                          <FormControl>
                            <RadioGroup
                              required
                              name={subitem.title}
                              {...(ans[index + subindex]
                                ? {
                                    value: ans.find(
                                      (i) => subitem.title === i.title,
                                    )?.answer,
                                  }
                                : { value: null })}
                              className="flex !flex-row !flex-nowrap"
                              style={{ flexDirection: 'row' }}
                            >
                              <Radio
                                disabled={disable}
                                // name={index + '-' + subindex}
                                defaultChecked={false}
                                value={true}
                                onChange={onChecked}
                              />
                              <Radio
                                disabled={disable}
                                // name={index + '-' + subindex}
                                defaultChecked={false}
                                value={false}
                                onChange={onChecked}
                              />
                            </RadioGroup>
                          </FormControl>
                        ) : null}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Paper>

      <div>
        <Paper className="my-10 py-10 mx-3">
          <Box sx={{ flexGrow: 1 }} className="px-5">
            <Typography className="mb-5 font-bold text-2xl font-Dosis">
              Thông tin người nhận máu
            </Typography>
            <div className="flex">
              <AntSelect
                // defaultValue={null}
                {...(data.blood_type
                  ? { value: data.blood_type }
                  : { value: null })}
                style={{ width: 240 }}
                onChange={(e) => {
                  setBloodData(e)
                }}
              >
                <Option disabled key={null} value={null}>
                  {'Chọn nhóm máu '}
                </Option>
                {bloodType.map((type, index) => {
                  return (
                    <Option key={index} value={type}>
                      {type}
                    </Option>
                  )
                })}
              </AntSelect>
              <AntSelect
                placeholder="-- Chọn hành động --"
                style={{ width: 240, margin: '0px 20px' }}
                defaultValue="false"
                onChange={(e) => {
                  setIsDone(e)
                }}
              >
                <Option value="true">Đã hoàn thành</Option>
                <Option value="false">Chưa hoàn thành</Option>
              </AntSelect>
              <Button onClick={handleChangeBlood}>Cập nhật</Button>
            </div>
          </Box>
        </Paper>
      </div>
    </div>
  )
}

export default AllStepForm
